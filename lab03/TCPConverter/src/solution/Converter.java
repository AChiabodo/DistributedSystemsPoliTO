package solution;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Converter {
   private ServerSocket serverSocket = null;
   ExecutorService threadPool = null;

   public Converter(int portNumber) throws IOException {
      this.serverSocket = new ServerSocket(portNumber);
   }

   public void execute() throws IOException {
      this.threadPool = Executors.newCachedThreadPool();

      while(true) {
         Socket socket = this.serverSocket.accept();
         this.threadPool.submit(new ConversionHandler(socket));
      }
   }

   public void stop() throws IOException {
      this.threadPool.shutdown();
      this.serverSocket.close();
   }
}
