package it.conversion;


import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;

public class ClientConversion {
	private Socket socket;
	private DataOutputStream outputSocketStream = null;
	private DataInputStream inputSocketStream = null;

	public ClientConversion(InetAddress server, int port) throws UnknownHostException, IOException {
		BufferedReader stdin = new BufferedReader(new InputStreamReader(System.in));
		
		Socket socket = new Socket(server, port);
		socket.setSoTimeout(5000);
		System.out.println("Connected to server.");
      	this.inputSocketStream = new DataInputStream(this.socket.getInputStream());
      	this.outputSocketStream = new DataOutputStream(this.socket.getOutputStream());
		
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
		try {
			int port = 2001;
			ClientConversion client = new ClientConversion(InetAddress.getLocalHost(),port);

			File file = new File(args[2]);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}


}