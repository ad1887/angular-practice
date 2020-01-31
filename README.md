## Running the Application

1. Install the Angular CLI

    `npm install -g @angular/cli`

1. Run `npm install`

1. Run `ng serve -o`

## Create & Install Application on Mobile Device

1. Run `npm install -g cordova`

2. Run `cordova create mobile` // inside app directory

3. Remove `www` under `mobile` directory

4. Add symlink to angular app build directory i.e. `ln -s ./dist www`

5. change base href under `mobile/index.html` to `./`

6. create a new script in package.json that let us run the project in your device "cordova": "cordova run android --device" // optional

7. Check added platforms `cordova platform ls`

8. Check `cordova requirements` 

9. Run `cordova platform add android`

10. Install `java`

11. Install `Gradle` to make build

12. Run `cordova build`

13. Run `cordova emulate android` // to run apk on emulator

14. Run `cordova run android` // to install apk on device

# Note: enable developer options, usb debugging options to install apk in device