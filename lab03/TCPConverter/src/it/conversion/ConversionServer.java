package it.conversion;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketAddress;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import java.util.concurrent.TimeUnit;
/**
 * A server that hosts the Converter service, plus infrastructure services like health and reflection.
 *
 */
public final class ConversionServer {
  
  public static void main(String[] args) throws IOException, InterruptedException {
    int port = 2001;
    ServerSocket ss = new ServerSocket(port);
		Executor service = Executors.newCachedThreadPool();
    System.out.println("Listening on port " + port);
    Socket s = null;
    while (true) {
      try {
        s = ss.accept();
        SocketAddress remoteAddress = s.getRemoteSocketAddress();		
        System.out.println("Accepted connection from "+remoteAddress);
        service.execute(new ConvertionService(s));
      } catch (IOException e) {
        // accept failed. Try again after some time
        try {
          Thread.sleep(1000);
        } catch (InterruptedException e1) {	
        }	
      } catch (Exception e) {
        ss.close();
        // some other error occurred. Make sure the socket has been closed
        if (!s.isClosed())
          s.close();
      }
    }
  }
}