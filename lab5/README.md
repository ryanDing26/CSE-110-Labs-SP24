# Lab 5 - Starter
Ryan Ding

1. While it would be good to test the entire message feature of an application, I would not use a unit test to as the message feature as a whole would involve so many interactive parts and is a large feature of the application that unit tests are not well-versed in handling quickly or at all. Additionally, changing the structure of your app's messaging feature would likely lead to heavy changes within the unit tests, which is something you want to avoid.

2. I would use a unit test to test the max message feature, as it would be able to execute quickly (measuring the length of a string is a relatively quick operation), debugs at a small scale without other moving parts (message length depends on one thing only: the message), and changing other feature would not break it. In order to test it, one could create a unit test for a regular message under 80 characters alongside edge cases such as a message with 0 characters, as well as cases where the message exceeds 80 characters and fails to send.

[expose](./expose.html) | [explore](./explore.html) | [GitHub Page](https://ryanding26.github.io/Lab5_Starter/)
