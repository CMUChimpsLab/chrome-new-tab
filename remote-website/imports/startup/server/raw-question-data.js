/*
 * File: questions.js
 * Project: Chrome New Tab
 * File Created: Sunday, 8th July 2018 12:22:54 pm
 * Description: exports raw question data to be inserted to mongo
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Last Modified: Thu Jul 26 2018
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */

const questions = [
  {
    category: 'Friends',
    title: 'Who do you think should be able to send you friend requests?', // 'Who can send you friend requests?',
    url: 'https://www.facebook.com/settings?tab=privacy&section=canfriend&view',
    options: ['Everyone', 'Friends of friends', 'Not sure'],
    scrapeTag: 0 // checked
  },
  {
    category: 'Friends',
    title: 'Who do you think should be able to see your friends list?', // 'Who can see your friends list?',
    url:
      'https://www.facebook.com/settings?tab=privacy&section=friendlist&view',
    options: ['Public', 'Friends', 'Only me', 'Not sure'],
    scrapeTag: 0 // checked
  },
  {
    category: 'Friends',
    title:
      'Who do you think should be able to look you up using the email address you provided?', // 'Who can look you up using the email address you provided?',
    description:
      "This applies to people who can't see your email address on your profile",
    url: 'https://www.facebook.com/settings?tab=privacy&section=findemail&view',
    options: ['Everyone', 'Friends of friends', 'Friends', 'Not sure'],
    scrapeTag: 0 // checked
  },
  {
    category: 'Friends',
    title:
      'Who do you think should be able to look you up using the phone number you provided?',
    description:
      "This applies to people who can't see your phone number on your profile.",
    url: 'https://www.facebook.com/settings?tab=privacy&section=findphone&view',
    options: ['Everyone', 'Friends of friends', 'Friends', 'Not sure'],
    scrapeTag: 0 // checked
  },
  {
    category: 'Friends',
    title: 'Who should be able to follow you?', // 'Who Can Follow Me?',
    description:
      'Followers see your posts in News Feed. Friends follow your posts by default, but you can also allow people who are not your friends to follow your public posts. Use this setting to choose who can follow you.\nEach time you post, you choose which audience you want to share with.',
    url: 'https://www.facebook.com/settings?tab=followers',
    options: ['Public', 'Friends', 'Not sure'],
    scrapeTag: 1 // checked
  },
  {
    category: 'Posts', // changed
    title:
      'In your opinion, who should be able to comment on your public posts?', // 'Who can comment on your public posts?',
    description:
      'Choose who is allowed to comment on your posts. Remember that in addition to who you choose here, anyone tagged in a post and their friends may be able to comment, too.',
    url: 'https://www.facebook.com/settings?tab=followers&section=comment&view',
    options: ['Friends', 'Friends of friends', 'Public', 'Not sure'],
    scrapeTag: 2 // checked
  },
  {
    category: 'Posts',
    title: 'Who should be able to see your future posts?', // 'Who can see your future posts?',
    description:
      'You decide who can see your posts each time you create a new post. Facebook will use that audience for future posts unless you change it.',
    url: 'https://www.facebook.com/settings?tab=privacy&section=composer&view',
    options: ['Only me', 'Friends', 'Public', 'Not sure'],
    scrapeTag: 3 // checked
  },
  // {
  //   category: 'Posts',
  //   title: 'Who can comment on your public posts?',
  //   url: 'https://www.facebook.com/settings?tab=followers&section=comment&view',
  //   options: ['Friends', 'Friends of Friends', 'Public', 'Not sure'],
  //   scrapeTag: 2
  // },
  {
    category: 'Posts',
    title: 'Public Post Notifications',
    description:
      "You can get notifications when people who aren't your friends start following you and share, like or comment on your public posts. Turn these notifications on for",
    url:
      'https://www.facebook.com/settings?tab=followers&section=notifications&view',
    options: ['Public', 'Friends of friends', 'Nobody', 'Not sure'],
    scrapeTag: 2 // checked
  },
  {
    category: 'Profile & Personal info',
    title: 'Should search engines outside of Facebook link to your profile?', // 'Do you want search engines outside of Facebook to link to your profile?',
    description:
      'When this setting is on, search engines may link to your profile in their results. When this setting is off, search engines will stop linking to your profile, but this may take some time. Your profile can still be found on Facebook if people search for your name.',
    url: 'https://www.facebook.com/settings?tab=privacy&section=search&view',
    options: ['Yes', 'No', 'Not sure'],
    scrapeTag: 4 // checked
  },
  {
    category: 'Profile & Personal info',
    title: 'Should Facebook be able to recognize you in photos and videos?',
    url:
      'https://www.facebook.com/settings?tab=facerec&section=face_recognition&view',
    options: ['Yes', 'No', 'Not sure'],
    scrapeTag: 5 // checked
  },
  {
    category: 'Profile & Personal info',
    title:
      'Who should be able to like or comment on your public profile pictures and other profile info?', // 'Who can like or comment on your public profile pictures and other profile info?',
    description:
      'Manage who can like or comment on profile information that is always public, including your profile pictures, profile videos, cover photos, featured photos and updates to your short bio.',
    url:
      'https://www.facebook.com/settings?tab=followers&section=public_profile_media&view',
    options: ['Public', 'Friends of friends', 'Friends', 'Not sure'], // "Only me" is not an option
    scrapeTag: 2 // checked
  },
  {
    category: 'Timeline & Tags',
    title: 'Who should be allowed to post on your timeline?', // 'Who can post on your timeline?',
    url: 'https://www.facebook.com/settings?tab=timeline&section=posting&view',
    options: ['Only me', 'Friends', 'Not sure'],
    scrapeTag: 0 // checked
  },
  {
    category: 'Timeline & Tags',
    title:
      "Would you like to review posts that you're tagged in before the posts appear on your timeline?", // "Review posts you're tagged in before the post appears on your timeline?",
    description:
      "Timeline review controls whether you have to manually approve posts you're tagged in before they go on your timeline. When you have a post to review, just click Timeline review on the left-hand side of your activity log. Note: This only controls what's allowed on your timeline. Posts you're tagged in still appear in search, News Feed and other places on Facebook.",
    url:
      'https://www.facebook.com/settings?tab=timeline&section=timeline_review&view',
    options: ['Yes', 'No', 'Not sure'],
    scrapeTag: 6 // checked
  },
  {
    category: 'Timeline & Tags',
    title:
      'Would you like to review tags people add to your posts before the tags appear on Facebook?', // 'Review tags people add to your posts before the tags appear on Facebook?',
    description:
      "If someone who you aren't friends with adds a tag to your post, you'll still be asked to review it. Remember: When you approve a tag, the person tagged and their friends may be able to see your post.",
    url:
      'https://www.facebook.com/settings?tab=timeline&section=tagreview&view',
    options: ['Yes', 'No', 'Not sure'],
    scrapeTag: 6 // checked
  },
  {
    category: 'Timeline & Tags',
    title:
      "When you're tagged in a post, who do you want to add to the audience of the post if they can't already see it?",
    description:
      "They'll be able to see these posts in places such as News Feed and search.",
    url:
      'https://www.facebook.com/settings?tab=timeline&section=expansion&view',
    options: ['Only me', 'Friends', 'Not sure'],
    scrapeTag: 0 // checked
  },
  {
    category: 'Timeline & Tags',
    title:
      "Who should be able to see posts that you're tagged in on your timeline?", // "Who can see posts that you're tagged in on your timeline?",
    url: 'https://www.facebook.com/settings?tab=timeline&section=tagging&view',
    options: [
      'Everyone',
      'Friends of friends',
      'Friends',
      'Only me',
      'Not sure'
    ],
    scrapeTag: 0 // checked
  }
  // ,
  // {
  //   category: 'Ads',
  //   title: 'Ads based on data from partners',
  //   description:
  //     'You may see ads based on your browsing history or online orders',
  //   url:
  //     'https://www.facebook.com/ads/preferences/?entry_product=ad_settings_screen',
  //   options: ['Allowed', 'Not allowed', 'Not sure'],
  //   scrapeTag: 7 // wait
  // },
  // {
  //   category: 'Ads',
  //   title:
  //     'Ads based on your activity on Facebook Company Products that you
  // see elsewhere',
  //   description:
  //     'More "relevant" ads, which is more of a problem for advertisers than
  // for you',
  //   url:
  //     'https://www.facebook.com/ads/preferences/?entry_product=ad_settings_screen',
  //   options: ['Yes', 'No', 'Not sure'],
  //   scrapeTag: 8
  // },
  // {
  //   category: 'Ads',
  //   title: 'Ads that include your social actions',
  //   description:
  //     'Your friends will not see ads based on actions you take, such as
  // liking a page or sharing a post',
  //   url:
  //     'https://www.facebook.com/ads/preferences/?entry_product=ad_settings_screen',
  //   options: ['Only my friends', 'No one', 'Not sure'],
  //   scrapeTag: 9
  // }
];

export default questions;
