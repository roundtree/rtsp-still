# RTSP capture still image

Docker iamge for capturing a jpeg image from a RTSP stream by calling an http endpoint.

## Usecase

This container can be used for capturing still images from RTSP enabled camera's not supporting a separate endpoint for capturing a still image. This project was specifically created for the EZVIZ DB1 doorbell camera, but should work for every camera providing a RTSP stream.

## Installing
The project can be run through Docker.

### Docker
The docker container exposes port 8845 by default (for network_mode 'host'), but the server running inside the Docker container can be configured to run on a different port when specified in an environment variable.

The following environment variables are supported:

| Environment variable | Required | Description |
|----------------------|----------|-------------|
| SERVER_PORT          | No       | The port to run the server on, will be the internal container port. Useful for exposing a different port when running with network_mode 'host' and the default port is already in use. See the Docker Compose example below. Defaults to 8445. |
| RTSP_URL             | Yes      | The RTSP URL of your camera. Should start with rtsp:// |

#### Build image
From the directory where the Dockerfile is located:
```bash
docker build -t rtsp-still .
```

#### Run directly
```bash
docker run --name rtsp-still-cam1 -p 8445:8845 -e RTSP_URL=rtsp://url-of-your-camera -d rtsp_still
```

#### Docker compose
With network mode 'bridge':
```yaml
version: '3'
services:
  rtsp-still-cam1:
    image: rtsp_still
    ports:
      - "8445:8445"
    environment:
      - RTSP_URL=rtsp://url-of-your-camera

```

With network mode 'host' (alternative port):
```yaml
version: '3'
services:
  rtsp-still-cam1:
    image: rtsp-still
    environment:
      - RTSP_URL=rtsp://url-of-your-camera
      - SERVER_PORT=8446
    expose:
      - "8446"
    network_mode: host    
```

## Calling the service:
A GET request to http://\<your-server-ip\>/snapshot.jpg will create and serve a snapshot image.
