### ------------------------
Generate jwt public and private keys

```bash
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
# Don't add passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
cat jwtRS256.key
cat jwtRS256.key.pub
```
![a8b0c33805b754a71792c0f8ba71c59f2b8603ee](https://user-images.githubusercontent.com/52937392/226219836-bb40f0c1-7010-49b6-8a35-3d1726fc2e79.png)


![4a7132c7e0833d72746fb3ad1bdac97f7705ee2b (1)](https://user-images.githubusercontent.com/52937392/226219839-e994a387-c7b9-4a4c-b00e-4bedb242bcd2.png)

