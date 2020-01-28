/*
 * File: questions.js
 * Project: Chrome New Tab
 * File Created: Sunday, 8th July 2018 12:22:54 pm
 * Description: exports raw question data to be inserted to mongo
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Last Modified: Fri Sep 21 2018
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */

const questions = [
  //=========================================
  // CATEGORY: LOGIN SECURITY
  //=========================================
{
  category: 'Login Security',
  title: 'Do you think two-factor authentication is necessary for your account?', // 'Use two-factor authentication'
  description: 'If you enable this feature then everytime your account is logged into from an \"un-saved device\", the person logging in must also enter a code sent to your mobile device via text or an authentication app of your choice. You can choose to \"save devices\" as you are logging in which won\'t require you to enter the code when you log in with that device in the future.',
  url: 'https://www.facebook.com/security/2fac/settings',
  options: [
    'Yes (On)',
    'No (Off)',
    'Not sure'
  ],
  scrapeTag: 5
},
{
  category: 'Login Security',
  title: 'Would you like to have 3 to 5 friends you would be able to contact whenever you get locked out of your account?', // 'Choose friends to contact if you get locked out'
  description: 'Facebook users can nominate anywhere from 3-5 people from their friends list as \"trusted contacts\". This ensures that if you ever get locked out of your account, any of the friends you nominate will then recieve a code and a URL to share with you to help you log back in. Facebook reccomends this to everyone.',
  url: 'https://www.facebook.com/settings?tab=security&section=trusted_friends&view',
  options: [
    'Yes (On)',
    'No (Off)',
    'Not sure'
  ],
  scrapeTag: 6
},
{
  category: 'Login Security',
  title: 'Would you want to get alerts about unrecognized logins?', // 'Get alerts about unrecognized logins'
  description: 'When Facebook notices your account login from an unrecognized device (a device you don\'t usually or have never used), you can customize how they will notify you about it. You can choose to recieve a notification through your Facebook account, through Facebook Messenger, and/or through your email address.',
  url: 'https://www.facebook.com/settings?tab=security&section=login_alerts&view',
  options: [
    'Yes (On)',
    'No (Off)',
    'Not sure'
  ],
  scrapeTag: 7
},
//=========================================
//  CATEGORY: YOUR POSTS & STORIES
//=========================================
{
  category: 'Your Posts & Stories',
  title: 'Who do you think should be able to see your future posts?', // 'Who can see your future posts?'
  description:
    'This decides who can see your posts each time you create a new post. Facebook will use this audience for all future posts unless you change it.',
  url: 'https://www.facebook.com/settings?tab=privacy&section=composer&view',
  options: [
    'Only me',
    'Friends',
    'Public',
    'Other (custom)',
    'Not sure'
  ],
  scrapeTag: 0 // checked
},
{
  category: 'Your Posts & Stories',
  title: 'Who do you think should be able to comment on your public posts?', // 'Who can comment on your public posts?',
  description:
    'Decide who is allowed to comment on your posts. Keep in mind that in addition to who you choose here, anyone tagged in a post and their friends might be able to comment.',
  url: 'https://www.facebook.com/settings?tab=followers&section=comment&view',
  options: [
    'Friends',
    'Friends of friends',
    'Public',
    'Not sure'
  ],
  scrapeTag: 2 // checked
},
{
  category: 'Your Posts & Stories',
  title: 'Who would you want to get public post notifications from?', 
  description: 'You can require that Facebook notifies you whenever people who aren\'t your friends start following and share, like, or comment on your public posts. You can customize who you get these notifications for.',
  url: 'https://www.facebook.com/settings?tab=followers&section=notifications&view',
  options: [
    'Public',
    'Friends of friends',
    'Nobody',
    'Not sure'
  ],
  scrapeTag: 2 // checked
},
{
  category: 'Your Posts & Stories',
  title: 'Do you think others should be allowed to share your posts to their stories?', // 'Allow others to share your posts to their stories?''
  description: 'When enabled, if you create a public post, anyone on Facebook can share it to their story. If you tag someone in any post, they can share it to their story and will control who sees it. Their story will include your full name, a link to your post, and will be visible for 24 hours.',
  url: 'https://www.facebook.com/settings?tab=timeline&section=story_reshare&view',
  options: [
    'Yes',
    'No',
    'Not sure'
  ],
  scrapeTag: 4
},
{
  category: 'Your Posts & Stories',
  title: 'Do you think others should be allowed to share your public stories to their own story?', // 'Allow others to share your public stories to their own story?'
  description: 'Their story will include your full name and a link to your original story, and will be visible for 24 hours. They will control who sees it.',
  url: 'https://www.facebook.com/settings?tab=stories&section=story_to_story&view',
  options: [
    'Yes',
    'No',
    'Not sure'
  ],
  scrapeTag: 8
},
//=========================================
//  CATEGORY: PROFILE & TIMELINE
//=========================================
{
  category: 'Profile & Timeline',
  title: 'Who do you think should be able to post on your timeline?', // 'Who can post on your timeline?'
  description: 'Only yourself and your friends can post onto your timeline. You can restrict your friends from posting to your timeline by configuring this setting to \'Only me\'. Keep in mind that your friends will still be able to comment on any post that they see.',
  url: 'https://www.facebook.com/settings?tab=timeline&section=posting&view',
  options: [
    'Only me',
    'Friends',
    'Not sure'
  ],
  scrapeTag: 0 // checked
},
{
  category: 'Profile & Timeline',
  title: 'Who do you think should be able to see what others post on your timeline?', // 'Who can see what others post on your timeline?''
  description: 'You can choose to limit who sees what other people post on your timeline, by choosing from one of the options below, or creating a custom list of people who you allow or blacklist from seeing what others post on your timeline. Keep in mind that your posts may still appear in other places on Facebook, like News Feed and Search, for people who are in the audience that they are shared with.',
  url: 'https://www.facebook.com/settings?tab=timeline&section=others&view',
  options: [
    'Only me',
    'Friends',
    'Friends of friends',
    'Everyone',
    'Other (custom)',
    'Not sure'
  ],
  scrapeTag: 0 // checked
},
{
  category: 'Profile & Timeline',
  title: 'Who do you think should be able to like and comment on your public profile pictures and other profile information?', // 'Who can like or comment on your public profile pictures and other profile info?',
  description: 'Manage who can like or comment on the profile information that is always public, including your profile pictures, profile videos, cover photos, featured photos and updates to your short bio.',
  url: 'https://www.facebook.com/settings?tab=followers&section=public_profile_media&view',
  options: [
    'Friends',
    'Friends of friends',
    'Public',
    'Not sure'
  ], // "Only me" is not an option
  scrapeTag: 2 // checked
},
{
  category: 'Profile & Timeline',
  title: 'Who do you think should be able to see your friends list?', // 'Who can see your friends list?',
  description: 'Decide on who can view the list of your friends on Facebook. If you set this to \'Only me\' then only you will be able to see your full friends list on your timeline. Other users will still be able to see any mutual friends they have with you. Keep in mind that your friends also control who can see friendships on their own timelines, and that if people can see your friendship on another timeline, they\'ll be able to see it in News Feed, Search, and other places on Facebook.',
  url: 'https://www.facebook.com/settings?tab=privacy&section=friendlist&view',
  options: [
    'Only me',
    'Friends',
    'Public',
    'Other (custom)',
    'Not sure'
  ],
  scrapeTag: 0 // checked
},
//=========================================
//  CATEGORY: TAGGING
//=========================================
{
  category: 'Tagging',
  title:
    "Who do you think should be able to see posts that you're tagged in on your timeline?", // "Who can see posts that you're tagged in on your timeline?",
  description: 'Decide who has access to posts you are tagged in that are on your timeline. Keep in mind that the photos, videos, or posts you\'ve been tagged in on Facebook are still visible to the audience that the original poster specified. The photos and posts are also visible the the audience the original poster gave permission in other places on Facebook such as in News Feed, and Search.', 
  url: 'https://www.facebook.com/settings?tab=timeline&section=tagging&view',
  options: [
    'Only me',
    'Friends',
    'Friends of friends',
    'Everyone',
    'Other (custom)',
    'Not sure'
  ],
  scrapeTag: 0 // checked
},
{
  category: 'Tagging',
  title:
    "When you're tagged in a post, who would you want to add to the audience of the post if they can't already see it?",
  description: "The people you give access will be able to see these posts in places such as News Feed and search.",
  url: 'https://www.facebook.com/settings?tab=timeline&section=expansion&view',
  options: [
    'Only me',
    'Friends',
    'Other (custom)',
    'Not sure'
  ],
  scrapeTag: 0 // checked
},
{
  category: 'Tagging',
  title:
    "Would you want to review posts that you're tagged in before the posts appear on your timeline?", // "Review posts you're tagged in before the post appears on your timeline?",
  description:
    "Timeline review controls whether you have to manually approve posts you're tagged in before they go on your timeline. When you have a post to review, just click Timeline review on the left-hand side of your activity log. Please remember, this only controls what's allowed on your timeline. Posts you're tagged in still appear in search, News Feed and other places on Facebook.",
  url:
    'https://www.facebook.com/settings?tab=timeline&section=timeline_review&view',
  options: [
    'Yes',
    'No',
    'Not sure'
  ],
  scrapeTag: 4 // checked
},

{
  category: 'Tagging',
  title:
    'Would you want to review tags people add to your posts before the tags appear on Facebook?', // 'Review tags people add to your posts before the tags appear on Facebook?',
  description: 
    "If someone who you aren't friends with adds a tag to your post, you'll still be asked to review it. Remember though that when you approve a tag, the person tagged and their friends may be able to see your post.",
  url:
    'https://www.facebook.com/settings?tab=timeline&section=tagreview&view',
  options: [
    'Yes',
    'No',
    'Not sure'
  ],
  scrapeTag: 4 // checked
},
{
  category: 'Tagging',
  title: 'Would you want Facebook to be able to recognize you in photos and videos?',
  description: 'When you turn on \"tag suggestions\" or \"face recognition\" Facebook uses a machine learning algorithm to analyze the pixels of the face image and creates a template. When new photos are uploaded Facebook compares the face present in the image to templates of relevant users and will look for matches (which pop up in the form of \"suggested tags\"). You need to check this setting periodically because Facebook automatically enrolls you as \"opting in\" whenever they roll out new features.',
  url:
    'https://www.facebook.com/settings?tab=facerec&section=face_recognition&view',
  options: [
    'Yes',
    'No',
    'Not sure'
  ],
  scrapeTag: 0 // checked
},
//=========================================
//  CATEGORY: CONNECTIONS & CONTACT
//=========================================
{
  category: 'Connections & Contact',
  title: 'Who do you think should be able to send you friend requests?', // 'Who can send you friend requests?',
  description: 'Decide on what category of people are allowed to send you friend requests on Facebook.', 
  url: 'https://www.facebook.com/settings?tab=privacy&section=canfriend&view',
  options: [
    'Friends of friends',
    'Everyone',
    'Not sure'
  ],
  scrapeTag: 0 // checked
},
{
  category: 'Connections & Contact',
  title: 'Who do you think should be able to follow you?', // 'Who Can Follow Me?',
  description:
    'Followers see your posts in News Feed. Friends follow your posts by default, but you can also allow people who are not your friends to follow your public posts. Use this setting to choose who can follow you.\nEach time you post, you choose which audience you want to share with.',
  url: 'https://www.facebook.com/settings?tab=followers',
  options: [
    'Friends',
    'Public',
    'Not sure'
  ],
  scrapeTag: 1 // checked
},
{
  category: 'Connections & Contact',
  title:
    'Who do you think should be able to look you up using the email address you provided?', // 'Who can look you up using the email address you provided?',
  description:
    "Keep in mind that whoever you give permission to look you up using your email will also be able to see your email on your profile/timeline.",
  url: 'https://www.facebook.com/settings?tab=privacy&section=findemail&view',
  options: [
    'Friends',
    'Friends of friends',
    'Everyone',
    'Only me',
    'Not sure'
  ],
  scrapeTag: 0 // checked
},
{
  category: 'Connections & Contact',
  title:
    'Who do you think should be able to look you up using the phone number you provided?',
  description:
    "Keep in mind that whoever you give permission to look you up using your phone number will also be able to see your phone number on your profile/timeline.",
  url: 'https://www.facebook.com/settings?tab=privacy&section=findphone&view',
  options: [
    'Friends',
    'Friends of friends',
    'Everyone',
    'Only me',
    'Not sure'
  ],
  scrapeTag: 0 // checked
},

{
  category: 'Connections & Contact',
  title: 'Would you want search engines outside of Facebook to link to your profile?', // 'Do you want search engines outside of Facebook to link to your profile?',
  description:
    'When this setting is on, search engines may link to your profile in their results. When this setting is off, search engines will stop linking to your profile, but this may take some time. However, information from your profile and some things you share can still appear in search engine results even if you select \"no\". Public information may also still appear in search results. This specifically includes things you share with the audience set to \"public\", in addition to posts and comments on Pages and Public Groups as well as posts in the Community Forum Section of the Help Center on Facebook.',
  url: 'https://www.facebook.com/settings?tab=privacy&section=search&view',
  options: [
    'Yes',
    'No',
    'Not sure'
  ],
  scrapeTag: 3 // checked
},
];

export default questions;
