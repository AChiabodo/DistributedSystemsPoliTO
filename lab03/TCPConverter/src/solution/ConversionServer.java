package solution;

import java.io.IOException;

public class ConversionServer {
   public static void main(String[] args) {
      int port = 2001;
      Converter converter = null;

      try {
         converter = new Converter(port);
      } catch (IOException var6) {
         System.out.println("Error in the creation of the socker server.");
         var6.printStackTrace();
         System.exit(0);
      }

      System.out.println("Server running on port " + port + ".");

      try {
         converter.execute();
      } catch (IOException var5) {
         System.out.println("Error in the management of the server socket.");
         var5.printStackTrace();
      }

      try {
         converter.stop();
      } catch (IOException var4) {
         System.out.println("Error in the closure of the server socket.");
         var4.printStackTrace();
      }

   }
}
