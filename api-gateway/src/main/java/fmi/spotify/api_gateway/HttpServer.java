package fmi.spotify.api_gateway;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.embedded.netty.NettyReactiveWebServerFactory;
import org.springframework.boot.web.server.WebServer;
import org.springframework.boot.web.server.WebServerException;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.HttpHandler;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

@Component
public class HttpServer implements ApplicationListener<ContextRefreshedEvent> {
    private WebServer httpServer;
    @Value("${HTTP_SERVER_PORT}")
    private int httpPort;

    @Override
    public void onApplicationEvent(@NonNull ContextRefreshedEvent event) {
        if (httpServer == null) {
            try {
                NettyReactiveWebServerFactory factory = new NettyReactiveWebServerFactory(httpPort);

                HttpHandler httpHandler = (ServerHttpRequest request, ServerHttpResponse response) -> {
                    response.setStatusCode(HttpStatus.MOVED_PERMANENTLY);

                    String host = request.getHeaders().getFirst("host");
                    String uri = request.getURI().getRawPath();
                    String query = request.getURI().getRawQuery();

                    String redirectUrl = "https://" + host + uri;
                    if (query != null && !query.isEmpty()) {
                        redirectUrl += "?" + query;
                    }

                    response.getHeaders().set("Location", redirectUrl);

                    return response.setComplete();
                };

                httpServer = factory.getWebServer(httpHandler);
                httpServer.start();
                System.out.println("HTTP redirect server started on port 8080");
            } catch (WebServerException ex) {
                System.err.println("Failed to start HTTP redirect server: " + ex.getMessage());
            }
        }
    }
}
