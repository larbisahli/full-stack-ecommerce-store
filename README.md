## How do I get into a Docker container's shell?

```bash
$  sudo docker exec -it admin-website sh
```

### ------------------------

Generate jwt public and private keys

```bash
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
# Don't add passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
cat jwtRS256.key
cat jwtRS256.key.pub
```
