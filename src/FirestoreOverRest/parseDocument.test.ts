import parseDocument from "./parseDocument"

export const exampleObjectResponse = {
  "data": [
    {
      "document": {
        "name": "projects/living-artist-dev/databases/(default)/documents/laAccounts/0qtvey8jjvf8w0zd1tyku1e20",
        "fields": {
          "profile": {
            "mapValue": {
              "fields": {
                "profileContent": {
                  "stringValue": "{\"object\":\"value\",\"document\":{\"object\":\"document\",\"data\":{},\"nodes\":[{\"object\":\"block\",\"type\":\"heading-one\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"This user has not yet filled out their profile\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"paragraph\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"Check back later for more...\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"paragraph\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"fd\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"paragraph\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"safjsfas\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"paragraph\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"dfas dfasf\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"paragraph\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"image\",\"data\":{\"imageSrc\":\"https://firebasestorage.googleapis.com/v0/b/living-artist-dev-images/o/cms-images%2Fus8gzh1c9ycf0r3se3t5qx69s%2F480.jpg?alt=media\"},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"paragraph\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"s\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"paragraph\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"paragraph\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"image\",\"data\":{\"imageSrc\":\"https://firebasestorage.googleapis.com/v0/b/living-artist-dev-images/o/cms-images%2Faccount-0qtvey8jjvf8w0zd1tyku1e20%2F2k3fnm3rfy7unbat7vkrxjbhc4%2F480.jpg?alt=media\"},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[]}]}]}]}}"
                },
                "listLink": {
                  "arrayValue": {
                    "values": [
                      {
                        "mapValue": {
                          "fields": {
                            "url": {
                              "stringValue": "https://v4-4-3.material-ui.com/api/text-field/"
                            },
                            "title": {
                              "stringValue": "fasdfa"
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              }
            }
          },
          "notifSetting": {
            "mapValue": {
              "fields": {
                "dailySummary": {
                  "mapValue": {
                    "fields": {
                      "app": {
                        "booleanValue": false
                      },
                      "email": {
                        "booleanValue": true
                      }
                    }
                  }
                },
                "newComments": {
                  "mapValue": {
                    "fields": {
                      "email": {
                        "booleanValue": true
                      },
                      "app": {
                        "booleanValue": true
                      }
                    }
                  }
                }
              }
            }
          },
          "email": {
            "stringValue": "kyle@cinder.studio"
          },
          "name": {
            "stringValue": "Kyle Hornberger fdsa"
          },
          "deletedAt": {
            "nullValue": null
          },
          "id": {
            "stringValue": "0qtvey8jjvf8w0zd1tyku1e20"
          },
          "createdAt": {
            "integerValue": "1562854975889"
          },
          "headline": {
            "stringValue": "Testk"
          },
          "capabilities": {
            "mapValue": {
              "fields": {
                "searchable": {
                  "arrayValue": {}
                },
                "details": {
                  "nullValue": null
                }
              }
            }
          },
          "stripeCustomerId": {
            "stringValue": "cus_GUwRpro9zMpQ2z"
          },
          "updatedAt": {
            "integerValue": "1584725436752"
          },
          "searchable": {
            "arrayValue": {
              "values": [
                {
                  "stringValue": "kyl"
                },
                {
                  "stringValue": "kyle"
                },
                {
                  "stringValue": "kyle "
                },
                {
                  "stringValue": "kyle h"
                },
                {
                  "stringValue": "kyle ho"
                },
                {
                  "stringValue": "kyle hor"
                },
                {
                  "stringValue": "kyle horn"
                },
                {
                  "stringValue": "kyle hornb"
                },
                {
                  "stringValue": "kyle hornbe"
                },
                {
                  "stringValue": "kyle hornber"
                },
                {
                  "stringValue": "kyle hornberg"
                },
                {
                  "stringValue": "kyle hornberge"
                },
                {
                  "stringValue": "kyle hornberger"
                },
                {
                  "stringValue": "kyle hornberger "
                },
                {
                  "stringValue": "kyle hornberger f"
                },
                {
                  "stringValue": "kyle hornberger fd"
                },
                {
                  "stringValue": "kyle hornberger fds"
                },
                {
                  "stringValue": "kyle hornberger fdsa"
                },
                {
                  "stringValue": "hor"
                },
                {
                  "stringValue": "horn"
                },
                {
                  "stringValue": "hornb"
                },
                {
                  "stringValue": "hornbe"
                },
                {
                  "stringValue": "hornber"
                },
                {
                  "stringValue": "hornberg"
                },
                {
                  "stringValue": "hornberge"
                },
                {
                  "stringValue": "hornberger"
                },
                {
                  "stringValue": "fds"
                },
                {
                  "stringValue": "fdsa"
                },
                {
                  "stringValue": "kyl"
                },
                {
                  "stringValue": "kyle"
                }
              ]
            }
          },
          "profileImageId": {
            "stringValue": "4et7bcnnm4f7t4uqjmjugbcs7j"
          },
          "type": {
            "stringValue": "personal"
          },
          "username": {
            "stringValue": "kyle"
          },
          "counts": {
            "mapValue": {
              "fields": {
                "publishedArticles": {
                  "integerValue": "2"
                },
                "followers": {
                  "integerValue": "13"
                },
                "following": {
                  "integerValue": "12"
                },
                "publishedArtworks": {
                  "integerValue": "10"
                }
              }
            }
          },
          "shouldUpdateDenormalizedSearchIndexes": {
            "booleanValue": true
          },
          "hasBetaAccess": {
            "booleanValue": true
          },
          "notificationSetting": {
            "mapValue": {
              "fields": {
                "dailySummary": {
                  "mapValue": {
                    "fields": {
                      "email": {
                        "booleanValue": true
                      },
                      "app": {
                        "booleanValue": false
                      }
                    }
                  }
                },
                "newComments": {
                  "mapValue": {
                    "fields": {
                      "email": {
                        "booleanValue": true
                      },
                      "app": {
                        "booleanValue": true
                      }
                    }
                  }
                }
              }
            }
          },
          "rVer": {
            "integerValue": "2"
          },
          "trophies": {
            "mapValue": {
              "fields": {
                "details": {
                  "mapValue": {
                    "fields": {
                      "cinder_street_employee": {
                        "mapValue": {
                          "fields": {
                            "metadata": {
                              "mapValue": {}
                            },
                            "createdAt": {
                              "integerValue": "1570735609683"
                            }
                          }
                        }
                      },
                      "budding_artist": {
                        "mapValue": {
                          "fields": {
                            "metadata": {
                              "mapValue": {}
                            },
                            "createdAt": {
                              "integerValue": "1572468999303"
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "searchable": {
                  "arrayValue": {
                    "values": [
                      {
                        "stringValue": "cinder_street_employee"
                      },
                      {
                        "stringValue": "budding_artist"
                      }
                    ]
                  }
                }
              }
            }
          },
          "link": {
            "nullValue": null
          }
        },
        "createTime": "2019-07-11T14:22:56.014991Z",
        "updateTime": "2020-03-20T18:40:47.638287Z"
      },
      "readTime": "2020-04-29T20:10:40.618377Z"
    }
  ]
}

const validResult = [
  {
    "profile": {
      "profileContent": "{\"object\":\"value\",\"document\":{\"object\":\"document\",\"data\":{},\"nodes\":[{\"object\":\"block\",\"type\":\"heading-one\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"This user has not yet filled out their profile\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"paragraph\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"Check back later for more...\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"paragraph\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"fd\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"paragraph\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"safjsfas\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"paragraph\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"dfas dfasf\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"paragraph\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"image\",\"data\":{\"imageSrc\":\"https://firebasestorage.googleapis.com/v0/b/living-artist-dev-images/o/cms-images%2Fus8gzh1c9ycf0r3se3t5qx69s%2F480.jpg?alt=media\"},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"paragraph\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"s\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"paragraph\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"paragraph\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"image\",\"data\":{\"imageSrc\":\"https://firebasestorage.googleapis.com/v0/b/living-artist-dev-images/o/cms-images%2Faccount-0qtvey8jjvf8w0zd1tyku1e20%2F2k3fnm3rfy7unbat7vkrxjbhc4%2F480.jpg?alt=media\"},\"nodes\":[{\"object\":\"text\",\"leaves\":[{\"object\":\"leaf\",\"text\":\"\",\"marks\":[]}]}]}]}}",
      "listLink": [
        {
          "url": "https://v4-4-3.material-ui.com/api/text-field/",
          "title": "fasdfa"
        }
      ]
    },
    "notifSetting": {
      "dailySummary": {
        "app": false,
        "email": true
      },
      "newComments": {
        "email": true,
        "app": true
      }
    },
    "email": "kyle@cinder.studio",
    "name": "Kyle Hornberger fdsa",
    "deletedAt": null,
    "id": "0qtvey8jjvf8w0zd1tyku1e20",
    "createdAt": "1562854975889",
    "headline": "Testk",
    "capabilities": {
      "searchable": null,
      "details": null
    },
    "stripeCustomerId": "cus_GUwRpro9zMpQ2z",
    "updatedAt": "1584725436752",
    "searchable": [
      "kyl",
      "kyle",
      "kyle ",
      "kyle h",
      "kyle ho",
      "kyle hor",
      "kyle horn",
      "kyle hornb",
      "kyle hornbe",
      "kyle hornber",
      "kyle hornberg",
      "kyle hornberge",
      "kyle hornberger",
      "kyle hornberger ",
      "kyle hornberger f",
      "kyle hornberger fd",
      "kyle hornberger fds",
      "kyle hornberger fdsa",
      "hor",
      "horn",
      "hornb",
      "hornbe",
      "hornber",
      "hornberg",
      "hornberge",
      "hornberger",
      "fds",
      "fdsa",
      "kyl",
      "kyle"
    ],
    "profileImageId": "4et7bcnnm4f7t4uqjmjugbcs7j",
    "type": "personal",
    "username": "kyle",
    "counts": {
      "publishedArticles": "2",
      "followers": "13",
      "following": "12",
      "publishedArtworks": "10"
    },
    "shouldUpdateDenormalizedSearchIndexes": true,
    "hasBetaAccess": true,
    "notificationSetting": {
      "dailySummary": {
        "email": true,
        "app": false
      },
      "newComments": {
        "email": true,
        "app": true
      }
    },
    "rVer": "2",
    "trophies": {
      "details": {
        "cinder_street_employee": {
          "metadata": null,
          "createdAt": "1570735609683"
        },
        "budding_artist": {
          "metadata": null,
          "createdAt": "1572468999303"
        }
      },
      "searchable": [
        "cinder_street_employee",
        "budding_artist"
      ]
    },
    "link": null
  }
]

test("clean translate documents from firestore", async () => {
    const result = exampleObjectResponse.data.map( entry => parseDocument(entry) )
    expect(JSON.stringify(result)).toBe(JSON.stringify(validResult))
})
