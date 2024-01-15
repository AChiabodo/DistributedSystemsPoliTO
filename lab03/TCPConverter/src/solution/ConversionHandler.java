package solution;

import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.Socket;
import java.net.SocketException;
import java.nio.charset.StandardCharsets;
import javax.imageio.ImageIO;

public class ConversionHandler implements Runnable {
   private static final int CHUNK_LENGTH = 1024;
   private static final int TIMEOUT = 3000;
   Socket socket = null;
   DataInputStream inputSocketStream = null;
   DataOutputStream outputSocketStream = null;
   boolean success = true;
   int responseCode = 0;
   String errorMessage = null;
   String typeOrigin = null;
   String typeTarget = null;
   int fileLength;

   public ConversionHandler(Socket socket) {
      this.socket = socket;

      try {
         this.socket.setSoTimeout(3000);
         this.inputSocketStream = new DataInputStream(socket.getInputStream());
         this.outputSocketStream = new DataOutputStream(socket.getOutputStream());
      } catch (SocketException var3) {
         this.errorMessage = new String("Error in setting the timeout for the socket.");
         this.success = false;
         this.responseCode = 2;
         var3.printStackTrace();
      } catch (IOException var4) {
         this.errorMessage = new String("Error in accessing the socket I/O streams.");
         this.success = false;
         this.responseCode = 2;
         var4.printStackTrace();
      }

   }

   public void run() {
      int messageLength;
      if (this.success) {
         try {
            byte[] typeArray = new byte[3];

            int totalReadBytes;
            for(totalReadBytes = 0; totalReadBytes < 3; totalReadBytes += messageLength) {
               messageLength = this.inputSocketStream.read(typeArray, totalReadBytes, 3 - totalReadBytes);
            }

            this.typeOrigin = new String(typeArray, StandardCharsets.US_ASCII);
            typeArray = new byte[3];

            for(totalReadBytes = 0; totalReadBytes < 3; totalReadBytes += messageLength) {
               messageLength = this.inputSocketStream.read(typeArray, totalReadBytes, 3 - totalReadBytes);
            }

            this.typeTarget = new String(typeArray, StandardCharsets.US_ASCII);
            System.out.println("The information about the media types has been received.");
            if (!this.typeOrigin.equalsIgnoreCase("png") && !this.typeOrigin.equalsIgnoreCase("jpg") && !this.typeOrigin.equalsIgnoreCase("gif") || !this.typeTarget.equalsIgnoreCase("png") && !this.typeTarget.toString().equalsIgnoreCase("jpg") && !this.typeTarget.equalsIgnoreCase("gif")) {
               this.success = false;
               this.errorMessage = new String("Media types not supported.");
               this.responseCode = 1;
            }
         } catch (SocketException var17) {
            this.success = false;
            this.errorMessage = new String("Timeout expired for reading the medatadata.");
            this.responseCode = 1;
            var17.printStackTrace();
         } catch (IOException var18) {
            this.success = false;
            this.errorMessage = new String("Error in receiving the metadata.");
            this.responseCode = 2;
            var18.printStackTrace();
         }
      }

      if (this.success) {
         try {
            this.fileLength = this.inputSocketStream.readInt();
            System.out.println("The information about the file length has been received.");
         } catch (SocketException var9) {
            this.success = false;
            this.errorMessage = new String("Timeout expired for receiving the file length.");
            this.responseCode = 1;
            var9.printStackTrace();
         } catch (IOException var10) {
            this.success = false;
            this.errorMessage = new String("Error in receiving the file length.");
            this.responseCode = 2;
            var10.printStackTrace();
         }
      }

      ByteArrayOutputStream baos = new ByteArrayOutputStream();
      if (this.success) {
         try {
            byte[] fileArray = new byte[1024];

            int readBytes;
            for(messageLength = this.fileLength; this.fileLength > 1024; fileArray = new byte[1024]) {
               readBytes = this.inputSocketStream.read(fileArray, 0, 1024);
               baos.write(fileArray, 0, readBytes);
               messageLength -= readBytes;
               this.fileLength = messageLength;
            }

            while(messageLength > 0) {
               readBytes = this.inputSocketStream.read(fileArray, 0, messageLength);
               baos.write(fileArray, 0, readBytes);
               messageLength -= readBytes;
               fileArray = new byte[1024];
            }

            System.out.println("The file has been received.");
         } catch (SocketException var15) {
            this.success = false;
            this.errorMessage = new String("Timeout expired for receiving the file.");
            this.responseCode = 1;
            var15.printStackTrace();
         } catch (IOException var16) {
            this.success = false;
            this.errorMessage = new String("Error in receiving the file.");
            this.responseCode = 2;
            var16.printStackTrace();
         }
      }

      ByteArrayOutputStream baosImageToSend = new ByteArrayOutputStream();
      if (this.success) {
         try {
            byte[] bytes = baos.toByteArray();
            ByteArrayInputStream bais = new ByteArrayInputStream(bytes);
            BufferedImage imageReceived = ImageIO.read(bais);
            ImageIO.write(imageReceived, this.typeTarget.toString().toLowerCase(), baosImageToSend);
            System.out.println("The file has been converted.");
         } catch (IOException var8) {
            this.success = false;
            this.errorMessage = new String("Error during the image conversion.");
            this.responseCode = 2;
            var8.printStackTrace();
         }
      }

      int bytesToWrite;
      BufferedInputStream bisMessageToSend;
      byte[] buffer;
      if (this.success) {
         try {
            this.outputSocketStream.write(48);
            messageLength = baosImageToSend.size();
            this.outputSocketStream.writeInt(messageLength);
            bisMessageToSend = new BufferedInputStream(new ByteArrayInputStream(baosImageToSend.toByteArray()));

            for(buffer = new byte[1024]; (bytesToWrite = bisMessageToSend.read(buffer, 0, 1024)) != -1; buffer = new byte[1024]) {
               this.outputSocketStream.write(buffer, 0, bytesToWrite);
            }

            System.out.println("The converted file has been sent back.");
         } catch (SocketException var13) {
            this.errorMessage = new String("Error in socket management while sending the positive response.");
            var13.printStackTrace();
         } catch (IOException var14) {
            this.errorMessage = new String("Error in sending the positive response.");
            var14.printStackTrace();
         }
      } else {
         try {
            if (this.responseCode == 1) {
               this.outputSocketStream.write(49);
            } else if (this.responseCode == 2) {
               this.outputSocketStream.write(50);
            }

            messageLength = this.errorMessage.length();
            this.outputSocketStream.writeInt(messageLength);
            bisMessageToSend = new BufferedInputStream(new ByteArrayInputStream(this.errorMessage.getBytes()));

            for(buffer = new byte[1024]; (bytesToWrite = bisMessageToSend.read(buffer, 0, 1024)) != -1; buffer = new byte[1024]) {
               this.outputSocketStream.write(buffer, 0, bytesToWrite);
            }

            System.out.println("Error: " + this.errorMessage);
            System.out.println("The error message has been sent back.");
         } catch (SocketException var11) {
            this.errorMessage = new String("Error in socket management while sending the negative response.");
            var11.printStackTrace();
         } catch (IOException var12) {
            this.errorMessage = new String("Error in sending the negative response.");
            var12.printStackTrace();
         }
      }

      try {
         this.socket.close();
      } catch (IOException var7) {
         var7.printStackTrace();
      }

   }
}
