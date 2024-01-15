package it.conversion;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.imageio.ImageIO;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Transparency;
import java.awt.image.BufferedImage;
/* 
public final class ConvertionService {

	private static final Logger logger = Logger.getLogger(ConvertionService.class.getName());
	

	@Override
	public StreamObserver<ConversionRequest> fileConvert(final StreamObserver<ConversionReply> responseObserver) {
		
		  final ByteArrayOutputStream baos = new ByteArrayOutputStream();
	      final AtomicBoolean completed = new AtomicBoolean(false);
	      final StringBuffer typeOrigin = new StringBuffer("");
	      final StringBuffer typeTarget = new StringBuffer("");
	      final StringBuffer errorMessage = new StringBuffer("");
	      final AtomicBoolean success = new AtomicBoolean(true);

	      return new StreamObserver<ConversionRequest>() {
	            @Override
	            public void onNext(ConversionRequest dataChunk) {
	            	
	            	if(success.get()) {
	            		try {
		            		switch(dataChunk.getRequestOneofCase().getNumber()) {
				            	//meta data information is received
				            	case ConversionRequest.META_FIELD_NUMBER : {
				            		typeOrigin.append(dataChunk.getMeta().getFileTypeOrigin());
				            		typeTarget.append(dataChunk.getMeta().getFileTypeTarget());
				            	}
				            	//file chunk is received
				            	case ConversionRequest.FILE_FIELD_NUMBER : {
					                   baos.write(dataChunk.getFile().toByteArray());
				            	}	
		            		}
		            	} catch (IOException e) {
		                    logger.log(Level.INFO,"error on write to byte array stream", e);
		                    onError(e);
		                } catch(Exception e) {
		                	logger.log(Level.INFO,"error on receiving the file", e);
		                    onError(e);
		                }
	            	}
	            }

	            @Override
	            public void onError(Throwable t) {
	                logger.log(Level.INFO, "error in receiving the file", t);
	                success.set(false);
	            }

	            @Override
	            public void onCompleted() {
	                logger.log(Level.INFO, "file has been received!");
	                completed.compareAndSet(false, true);
	               
	                //check if media types are supported
	                if(!typeOrigin.toString().equalsIgnoreCase("png") && !typeOrigin.toString().equalsIgnoreCase("jpg")
	    	        		&& !typeOrigin.toString().equalsIgnoreCase("gif") && !typeTarget.toString().equalsIgnoreCase("png") && !typeTarget.toString().equalsIgnoreCase("jpg") 
	    	        		&& !typeTarget.toString().equalsIgnoreCase("gif") 
	    	        		) {
	    	        	logger.log(Level.INFO, "media type not supported!");
	    	        	success.set(false);
	    	        }

	                //conversion
	    	        ByteArrayOutputStream baosImageToSend = new ByteArrayOutputStream();
	    	        if(success.get()) {
	    				try {
	    					byte[] bytes = baos.toByteArray();
	    				    ByteArrayInputStream bais = new ByteArrayInputStream(bytes);
	    				    BufferedImage imageReceived;
	    					imageReceived = ImageIO.read(bais);
	    					if(imageReceived.getColorModel().getTransparency() != Transparency.OPAQUE) {
	    						imageReceived = fillTransparentPixels(imageReceived, Color.WHITE);
	    					}
	    				    ImageIO.write(imageReceived, typeTarget.toString(), baosImageToSend);   
	    				} catch (IOException e) {
	    					success.set(false);
	    					e.printStackTrace();
	    				}
	    	        }
	    	        
	    			
	    			//send back
	    	       
	    			
	    			//Case 1: success
	    			if(success.get()) {
	    				logger.log(Level.INFO, "conversion has been successful!");
	    				responseObserver.onNext(ConversionReply.newBuilder()
	    			            .setMeta(MetadataReply.newBuilder().setSuccess(true))
	    			            .build());
	    				
	    				BufferedInputStream bisImageToSend = new BufferedInputStream(new ByteArrayInputStream(baosImageToSend.toByteArray()));

	    	            int bufferSize = 1 * 1024; // 1KB
	    	            byte[] buffer = new byte[bufferSize];
	    	            int length;
	    	            try {
	    					while ((length = bisImageToSend.read(buffer, 0, bufferSize)) != -1) {
	    					    responseObserver.onNext(ConversionReply.newBuilder()
	    					            .setFile(ByteString.copyFrom(buffer, 0, length))
	    					            .build());
	    					}
	    				} catch (IOException e) {
	    					e.printStackTrace();
	    					responseObserver.onError(e);
	    				}
	    	            try {
							bisImageToSend.close();
						} catch (IOException e) {
							e.printStackTrace();
							responseObserver.onError(e);
						}
	    	            
	    			} 
	    			
	    			//Case 2: error
	    			else {
	    				logger.log(Level.INFO, "conversion has failed!");
	    				responseObserver.onNext(ConversionReply.newBuilder()
	    			            .setMeta(MetadataReply.newBuilder()
	    			            .setSuccess(false)
	    			            .setError(errorMessage.toString()))
	    			            .build());
	    			}
	    			
	    			responseObserver.onCompleted();
	                           
	            }
	        };     
	}; 
	
	
	public static BufferedImage fillTransparentPixels( BufferedImage image, Color fillColor ) {
		int w = image.getWidth();
		int h = image.getHeight();
		BufferedImage image2 = new BufferedImage(w, h, 
		BufferedImage.TYPE_INT_RGB);
		Graphics2D g = image2.createGraphics();
		g.setColor(fillColor);
		g.fillRect(0,0,w,h);
		g.drawRenderedImage(image, null);
		g.dispose();
		return image2;
	}
};

*/
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ConvertionService implements Runnable {
	private static final int BUFSIZE = 32;

	Socket socket;

	public ConvertionService(Socket socket) {
		this.socket = socket;
	}

	@Override
	public void run() {
		try {
			service();
		} catch (Exception e) {
			
		} finally {
			if (socket!=null && !socket.isClosed())
				try {
					socket.close();
				} catch (IOException e) {
					
				}
		}
	}
	
	public void service() throws IOException {
		byte[] rBuf = new byte[BUFSIZE];
		int rsize;
		socket.setSoTimeout(5000);
		InputStream in = socket.getInputStream();
		OutputStream out = socket.getOutputStream();
		while ((rsize = in.read(rBuf)) != -1) {
			System.out.println("Received: " + new String(rBuf));
			out.write(rBuf, 0, rsize);
		}
		socket.close();
	}
}
