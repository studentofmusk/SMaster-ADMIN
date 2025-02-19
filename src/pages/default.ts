export const defaultLanguages = [
        {
          "_id": "67b0561d55d61a767c9e8ff8",
          "title": "ASL",
          "seasons": [
            "67b05c01432f709a1a979b0d"
          ],
          "createdAt": "2025-02-15T08:53:49.582Z",
          "updatedAt": "2025-02-15T09:55:25.662Z",
          "__v": 2
        }
      ]

export const defaultSeasons = [
      {
        "_id": "67b05c01432f709a1a979b0d",
        "title": "SEASON 1",
        "language_id": "67b0561d55d61a767c9e8ff8",
        "groups": [
          "67b0b3748087d324db77af1f"
        ],
        "createdAt": "2025-02-15T09:18:57.436Z",
        "updatedAt": "2025-02-15T15:34:44.401Z",
        "__v": 1
      }
    ]

export const defaultGroups = [
    {
    "_id": "67b0b3748087d324db77af1f",
    "title": "basics introduction",
    "season_id": "67b05c01432f709a1a979b0d",
    "lessons": [
    "67b175ec1baf452f4e87f649",
    "67b176181baf452f4e87f64c"
    ],
    "createdAt": "2025-02-15T15:32:04.362Z",
    "updatedAt": "2025-02-16T05:42:03.140Z",
    "__v": 2
    }
]

export const defaultLessons = [
  {
    "_id": "67b175ec1baf452f4e87f649",
    "total_xp": 10,
    "group_id": "67b0b3748087d324db77af1f",
    "lesson_type": "LEARNING",
    "topics": [
      {
        "topic_type": "LECTURE",
        "topic_id": "67af240aa558632741a46919",
        "skippable": false,
        "xp": 5,
        "_id": "67b186ecc92ce033fc545797"
      },
      {
        "topic_type": "VIDEO_TO_TEXT",
        "topic_id": "67af51f9120d12e3df1950e6",
        "skippable": false,
        "xp": 5,
        "_id": "67b18743c92ce033fc5457a0"
      }
    ],
    "__v": 2
  },
  {
    "_id": "67b176181baf452f4e87f64c",
    "total_xp": 0,
    "group_id": "67b0b3748087d324db77af1f",
    "lesson_type": "EXERCISE",
    "topics": [],
    "__v": 0
  }
]

export const defaultVideos = [
    {
      "_id": "67af23f8a558632741a46916",
      "title": "hello",
      "url": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739531255894-video_1.mp4",
      "thumbnail": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739531255896-thumbnail_1.png",
      "audio": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739531255901-audio_1.mp3",
      "action_id": 1,
      "createdAt": "2025-02-14T11:07:36.236Z",
      "updatedAt": "2025-02-14T11:07:36.236Z",
      "__v": 0
    },
    {
      "_id": "67af5b31f93805f24596adaa",
      "title": "hello_2",
      "url": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739545392778-video_1.mp4",
      "thumbnail": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739545392788-thumbnail_1.png",
      "audio": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739545392786-audio_1.mp3",
      "action_id": 1,
      "createdAt": "2025-02-14T15:03:13.225Z",
      "updatedAt": "2025-02-14T15:03:13.225Z",
      "__v": 0
    },
    {
      "_id": "67af5b35f93805f24596adad",
      "title": "hello_3",
      "url": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739545397377-video_1.mp4",
      "thumbnail": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739545397380-thumbnail_1.png",
      "audio": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739545397379-audio_1.mp3",
      "action_id": 1,
      "createdAt": "2025-02-14T15:03:17.602Z",
      "updatedAt": "2025-02-14T15:03:17.602Z",
      "__v": 0
    },
    {
      "_id": "67af5b3af93805f24596adb0",
      "title": "hello_4",
      "url": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739545402057-video_1.mp4",
      "thumbnail": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739545402059-thumbnail_1.png",
      "audio": "https://smaster-storage.s3.ap-south-1.amazonaws.com/videos/1739545402059-audio_1.mp3",
      "action_id": 1,
      "createdAt": "2025-02-14T15:03:22.256Z",
      "updatedAt": "2025-02-14T15:03:22.256Z",
      "__v": 0
    }
  ]