/*
 * File: questions.js
 * Project: Chrome New Tab
 * File Created: Sunday, 8th July 2018 12:22:54 pm
 * Description: exports raw question data to be inserted to mongo
 * Authors: Rosie Sun (rosieswj@gmail.com)
 *          Gustavo Umbelino (gumbelin@gmail.com)
 * -----
 * Last Modified: Friday, 13th July 2018 8:21:26 pm
 * -----
 * Copyright (c) 2018 - 2018 CHIMPS Lab, HCII CMU
 */

const questions = [
  {
    category: 'Friends',
    title: 'Who can send you friend requests?',
    url: 'https://www.facebook.com/settings?tab=privacy&section=canfriend&view',
    options: ['Friends of friends', 'Everyone'],
    scrapeTag: 0 // checked
  },
  {
    category: 'Friends',
    title: 'Who can see your friends list?',
    url:
      'https://www.facebook.com/settings?tab=privacy&section=friendlist&view',
    options: ['Only me', 'Friends', 'Public'],
    scrapeTag: 0 // checked
  },
  {
    category: 'Friends',
    title: 'Who can look you up using the email address you provided?',
    description:
      'Strangers won’t be able to hunt you down using your contact information',
    url: 'https://www.facebook.com/settings?tab=privacy&section=findemail&view',
    options: ['Friends', 'Friends of friends', 'Everyone'],
    scrapeTag: 0 // checked
  },
  {
    category: 'Friends',
    title: 'Who can look you up using the phone address you provided?',
    description:
      'Strangers won’t be able to hunt you down using your contact information',
    url: 'https://www.facebook.com/settings?tab=privacy&section=findphone&view',
    options: ['Friends', 'Friends of friends', 'Everyone'],
    scrapeTag: 0 // checked
  },
  {
    category: 'Friends',
    title: 'Who Can Follow Me?',
    description: 'Strangers won’t be able see your posts in News Feed',
    url: 'https://www.facebook.com/settings?tab=followers',
    options: ['Friends', 'Public'],
    scrapeTag: 1 // checked
  },
  {
    category: 'Posts', // changed
    title: 'Who can comment on your public posts?',
    description:
      'Choose who is allowed to comment on your posts. Remember that in addition to who you choose here, anyone tagged in a post and their friends may be able to comment, too.',
    url: 'https://www.facebook.com/settings?tab=followers&section=comment&view',
    options: ['Friends', 'Friends of Friends', 'Public'],
    scrapeTag: 2 // checked
  },
  {
    category: 'Posts',
    title: 'Who can see your future posts?',
    description:
      'People not friends with you won’t be able to see your posts each time you create a new post',
    url: 'https://www.facebook.com/settings?tab=privacy&section=composer&view',
    options: ['Only me', 'Friends', 'Public'],
    scrapeTag: 3 // checked
  },
  // {
  //   category: 'Posts',
  //   title: 'Who can comment on your public posts?',
  //   url: 'https://www.facebook.com/settings?tab=followers&section=comment&view',
  //   options: ['Friends', 'Friends of friends', 'Public'],
  //   scrapeTag: 2
  // },
  {
    category: 'Posts',
    title: 'Public Post Notifications',
    description:
      "You can get notifications when people who aren't your friends start following you and share, like or comment on your public posts. Turn these notifications on for",
    url:
      'https://www.facebook.com/settings?tab=followers&section=notifications&view',
    options: ['Nobody', 'Friends of friends', 'Public'],
    scrapeTag: 2 // checked
  },
  {
    category: 'Profile & Personal info',
    title:
      'Do you want search engines outside of Facebook to link to your profile?',
    description:
      'Search engine sites like Google or Yahoo will stop linking to your profile',
    url: 'https://www.facebook.com/settings?tab=privacy&section=search&view',
    options: ['Yes', 'No'],
    scrapeTag: 4 // checked
  },
  {
    category: 'Profile & Personal info',
    title:
      'Do you want Facebook to be able to recognize you in photos and videos?',
    description: 'Facebook won’t recommend tagging you in photos',
    url:
      'https://www.facebook.com/settings?tab=facerec&section=face_recognition&view',
    options: ['Yes', 'No'],
    scrapeTag: 5 // checked
  },
  {
    category: 'Profile & Personal info',
    title:
      'Who can like or comment on your public profile pictures and other profile info?',
    description:
      'Strangers being able to hunt you down or discover your interests',
    url:
      'https://www.facebook.com/settings?tab=followers&section=public_profile_media&view',
    options: ['Friends', 'Friends of Friends', 'Public'],
    scrapeTag: 2 // checked
  },
  {
    category: 'Timeline & Tags',
    title: 'Who can post on your timeline?',
    description: 'Strangers won’t be able to make comments on your timeline',
    url: 'https://www.facebook.com/settings?tab=timeline&section=posting&view',
    options: ['Only me', 'Friends'],
    scrapeTag: 0 // checked
  },
  {
    category: 'Timeline & Tags',
    title:
      "Review posts you're tagged in before the post appears on your timeline?",
    description:
      'Letting others post on your behalf — at least until you approve each post',
    url:
      'https://www.facebook.com/settings?tab=timeline&section=timeline_review&view',
    options: ['Enabled', 'Disabled'],
    scrapeTag: 6 // checked
  },
  {
    category: 'Timeline & Tags',
    title:
      'Review tags people add to your posts before the tags appear on Facebook?',
    description:
      'Letting others post on your behalf — at least until you approve each post',
    url:
      'https://www.facebook.com/settings?tab=timeline&section=tagreview&view',
    options: ['Enabled', 'Disabled'],
    scrapeTag: 6 // checked
  },
  {
    category: 'Timeline & Tags',
    title:
      "When you're tagged in a post, who do you want to add to the audience of the post if they can't already see it?",
    description:
      'People won’t be able to see these posts in places like News Feed and search',
    url:
      'https://www.facebook.com/settings?tab=timeline&section=expansion&view',
    options: ['Only me', 'Friends'],
    scrapeTag: 0 // checked
  },
  {
    category: 'Timeline & Tags',
    title: "Who can see posts you're tagged in on your timeline?",
    url: 'https://www.facebook.com/settings?tab=timeline&section=tagging&view',
    options: ['Only me', 'Friends', 'Friends of Friends', 'Everyone'],
    scrapeTag: 0 // checked
  },
  {
    category: 'Ads',
    title: 'Ads based on data from partners',
    description:
      'You may see ads based on your browsing history or online orders',
    url:
      'https://www.facebook.com/ads/preferences/?entry_product=ad_settings_screen',
    options: ['Allowed', 'Not allowed'],
    scrapeTag: 7 // wait
  },
  {
    category: 'Ads',
    title:
      'Ads based on your activity on Facebook Company Products that you see elsewhere',
    description:
      'More "relevant" ads, which is more of a problem for advertisers than for you',
    url:
      'https://www.facebook.com/ads/preferences/?entry_product=ad_settings_screen',
    options: ['Yes', 'No'],
    scrapeTag: 8
  },
  {
    category: 'Ads',
    title: 'Ads that include your social actions',
    description:
      'Your friends will not see ads based on actions you take, such as liking a page or sharing a post',
    url:
      'https://www.facebook.com/ads/preferences/?entry_product=ad_settings_screen',
    options: ['Only my friends', 'No one'],
    scrapeTag: 9
  }
];

export default questions;
