podman image rm -f excuseservice
podman image rm -f tmdbservice
podman image rm -f weatherservice
podman image rm -f locationservice

echo "start"

cd microServices/excuseService
podman build -f Podmanfile -t excuseservice .

cd ../locationService
cp .env-template .env
podman build -f Podmanfile -t locationservice .

cd ../TMDBService
podman build -f Podmanfile -t tmdbservice .

cd ../weatherService
cp .env-template .env
podman build -f Podmanfile -t weatherservice .

cd ../..

echo "end"

podman run -dit -p 8089:8089 --name excuseservice excuseservice
podman run -dit -p 8087:8087 --name locationservice locationservice
podman run -dit -p 8090:8090 --name tmdbservice tmdbservice
podman run -dit -p 8088:8088 --name weatherservice weatherservice