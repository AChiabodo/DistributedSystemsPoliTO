package solution;

import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.InetAddress;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

public class ConversionRequest {
   private static final int CHUNK_LENGTH = 1024;
   private static final int TIMEOUT = 30000;
   private Socket socket;
   private DataOutputStream outputSocketStream = null;
   private DataInputStream inputSocketStream = null;

   private ConversionRequest(InetAddress serverAddress, int serverPort) throws IOException {
      this.socket = new Socket(serverAddress, serverPort);
      this.inputSocketStream = new DataInputStream(this.socket.getInputStream());
      this.outputSocketStream = new DataOutputStream(this.socket.getOutputStream());
      this.socket.setSoTimeout(30000);
   }

   public static void main(String[] args) {
      if (args.length != 3) {
         System.err.println("Check command line arguments: input, output, filename");
         System.exit(1);
      }

      if (!args[0].matches("[A-Z]{3}") || !args[1].matches("[A-Z]{3}")) {
         System.err.println("Input and output must be 3 uppercase letters each.");
         System.exit(1);
      }

      ConversionRequest client = null;
      String input = args[0];
      String output = args[1];
      String filename = args[2];

      try {
         client = new ConversionRequest(InetAddress.getByName("0.0.0.0"), 2001);
         System.out.println("Input: " + input + " Output: " + output + " Filename: " + filename);
         System.out.println("\r\nConnected to Server: " + client.socket.getInetAddress());
      } catch (Exception var7) {
         System.err.println("Error when connecting to server");
         var7.printStackTrace();
         System.exit(1);
      }

      try {
         client.sendCommands(input, output, filename);
      } catch (IOException var6) {
         System.out.println("Cannot connect to server");
         var6.printStackTrace();
      }

   }

   private void sendCommands(String input, String output, String filename) throws IOException {
      InputStream is = this.socket.getInputStream();
      File file = new File("image/" + filename);
      int fileSizeToSend = (int)file.length();
      FileInputStream fin = new FileInputStream("image/" + filename);
      byte[] fileByteArray = new byte[1024];
      ByteArrayOutputStream baos = new ByteArrayOutputStream();
      byte[] inputb = input.getBytes(StandardCharsets.US_ASCII);
      this.outputSocketStream.write(inputb);
      byte[] outputb = output.getBytes(StandardCharsets.US_ASCII);
      this.outputSocketStream.write(outputb);
      System.out.println("The information about the media types has been sent.");
      this.outputSocketStream.writeInt(fileSizeToSend);
      System.out.println("The information about the file length has been sent.");

      int count;
      while((count = fin.read(fileByteArray)) > 0) {
         this.outputSocketStream.write(fileByteArray, 0, count);
      }

      this.outputSocketStream.flush();
      fin.close();
      System.out.println("The file has been sent.");
      char isSuccess = (char)is.read();
      System.out.println("The response code has been received.");
      switch(isSuccess) {
      case '0':
         int fileSizeToRead = this.inputSocketStream.readInt();

         int bytesToRead;
         int readBytes;
         for(bytesToRead = fileSizeToRead; fileSizeToRead > 1024; fileByteArray = new byte[1024]) {
            readBytes = this.inputSocketStream.read(fileByteArray, 0, 1024);
            baos.write(fileByteArray, 0, readBytes);
            bytesToRead -= readBytes;
            fileSizeToRead = bytesToRead;
         }

         while(bytesToRead > 0) {
            readBytes = this.inputSocketStream.read(fileByteArray, 0, bytesToRead);
            baos.write(fileByteArray, 0, readBytes);
            bytesToRead -= readBytes;
            fileByteArray = new byte[1024];
         }

         Throwable var27 = null;
         Object var17 = null;

         try {
            FileOutputStream outputStream = new FileOutputStream("image/output." + output.toLowerCase());

            try {
               baos.writeTo(outputStream);
               outputStream.close();
            } finally {
               if (outputStream != null) {
                  outputStream.close();
               }

            }
         } catch (Throwable var24) {
            if (var27 == null) {
               var27 = var24;
            } else if (var27 != var24) {
               var27.addSuppressed(var24);
            }
         }

         System.out.println("The converted file has been received.");
         break;
      case '1':
         System.out.println("Wrong Request");
         break;
      case '2':
         System.out.println("Internal Server Error");
      }

   }
}
