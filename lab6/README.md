# Explore: More E2E testing with CRUD

In this part of the lab, we will want you to create some E2E tests for the CRUD app provided. It is a simple note taker app with some basic functionality, and it will be left up to you as to how testing should be conducted. We will require you to create multiple tests to make sure all the different aspects of the app are working properly together, so make sure your tests cover all the features of the app in order to receive full credit. We suggest looking through the code and to play around with the app itself to help you decide what to test.

And once you are ready to write tests go ahead and create a new test file to house your test and whatever other supporting files you need to run E2E test in general. The deliverable for this part of the lab will be a short video, 30 seconds or less, showing all your test being conducted on the screen. Please place this video under the video folder and that will be all for the explore part of the lab.

You may use any screen recording software for recording the video. For a simple and free option, we recommend adding the [Screencastify](https://chromewebstore.google.com/detail/screencastify-screen-vide/mmeijimgabbpbgpdklnllpncmdofkcpn). extension to your browser, which allows you to record the entire desktop window.

 

Notetaking app features (this may help you figure out what tests you need to write to cover everything):

Add new note
Edit new note
Edit existing note
Notes are saved locally (notes are still there after refreshing page)
Delete note by double clicking on note

### Check Your Understandings
1. You would fit your automated tests within your GitHub actions that run whenever code is published. This is because it is automatable through GitHub actions, which avoids the need to run it yourself locally and manually, especially if you forgot to do so after some time. Additionally, it allows for your code to be tested more often thus allowing for you to see if your developmental process is adhering to the tests or not, so that one can adjust it if not (this is better than running everything solely after all development is complete, as you might find yourself failing all your tests and recognizing that your development is actually not all complete).

2. You would not use an end-to-end test to check if a specific function is returning the correct output, because unless that function makes up your entire user action process from start to finish, it is only a small part of your program rather than the entire thing. Instead, unit testing should be done in this regard, which was what was covered in Lab 5. 