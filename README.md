# Intructions:

    1- Run 'npm install to install' the necessary npm packages.
    2- Create a '.env' file in the root directory with the following information:
        'MONGODB_URI="your-mongodb-connection-link"'
        'OPENAI_API_KEY="your-openai-api-key"'
    3-If you want to make changes to the scss codes and you are using VS-Code editor install
    'Live Sass Compiler' as an extension in order to compile your scss code

# Logs:

## 2 February

Brainstormed ideas and determined project goals.

## 9 February

Drew website design on paper.

## 16 February

I made the decision and started to develop an application that utilizes Express for the back-end code, MongoDB as the database, and React for the front-end.

## 23 February

I encountered several challenges with React, so I chose not to use it for the front-end and started using regular HTML files instead.

## 2 March

Using regular HTML files turned out to be a less than ideal choice, as it required running two different servers, one for the front-end and one for the back-end, which made everything more complicated. My supervisor introduced me to EJS, so I switched to using EJS files instead of regular HTML files for the front-end.

## 9 March

I completed most of the CSS code and styling for the project, but there were additional changes that still needed to be made, so I continued working on it.

## 16 March

I began working on the back-end code by focusing on implementing a register and login system. To accomplish this, I utilized JSON Web Token for handling user authentication, bcrypt for encrypting users' passwords, and Joi for validating user input.

## 23 March

I was not entirely comfortable with using JSON Web Token, possibly because I didn't fully understand how to use it effectively, so I decided to skip it and move on. Instead, I attempted to store users' data in session, but ran into issues when I tried to use it with CORS in my application, which caused problems with sessions.

## 30 March

I made several attempts to troubleshoot the issue, but was unsuccessful in resolving the problem. As a result, I made the decision to remove CORS from my application and use alternative approaches. Ultimately, I concluded that starting the project again from scratch without CORS would be the most effective solution.

## 6 April

I restarted the project from the beginning and was able to make it work without using CORS. I successfully implemented a system for saving user information in sessions.

## 20 April

I came up with the idea of implementing premium plans, allowing users to subscribe and access the website. To enable this functionality, I integrated the Stripe payment system.

## 27 April

My supervisor suggested that we use Sass instead of regular CSS for the project, so I refactored my CSS code into Sass. To compile the Sass code into CSS, I utilized an extension called Live Sass Compiler.

## 4 May

I attempted to use Stripe webhooks to receive notifications when a user subscribed to a premium plan, but was unsuccessful due to time constraints and other challenges encountered during the project. As a result, I made the decision to manually handle subscription information in the database. When a user subscribes, I update their information in the database, allowing them to access the website.
