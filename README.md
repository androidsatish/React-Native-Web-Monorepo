# React-Native-Web-Monorepo

<h2>react-native + react-native-web with shared components</h2>

<p>I have been searching on how to create monorepo for my react-native project with same code to be used in web as shared/common
components. I tried many times and watched many videos but did not succeed until I found this
<a href="https://dev.to/brunolemos/tutorial-100-code-sharing-between-ios-android--web-using-react-native-web-andmonorepo-4pej">tutorial</a>
by Bruno Lemos
</p>

<b>Steps to run</b>
<li>clone 'https://github.com/androidsatish/React-Native-Web-Monorepo.git'</li>
<li>open terminal and cd to project root dir</li>
<li>run command 'yarn'</li>
<li>you can run from root dir "yarn workspace web start" to run it on web or "yarn workspace mobile start" to run it on mobile</li>
<li>make sure you have android or ios deive/emulator running</li>
<li>you can navigate to /packages/web  and run command "yarn start"  or</li>
<li>navigate to /packages/mobile and run "yarn run android"</li>
<br>

<b>Notes</b>
<li>Make sure react version is same in all package.json files after you install node modules</li>
<li>Though You can share 100 % code vie monorepo but you will have to maintain platform specific files in order
to make it look better across ios,android and web like App.web.js (for web) and App.native.js for(android/ios)</li>
<li>You can add as much as new packages like  windows, presenters, reducers etc to share it among every other packages</li>
