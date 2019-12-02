/**
 * @description meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String } (null) 显示在侧边栏、面包屑和标签栏的文字
 *  hideInMenu: { Boolean } (false) 设为true后在左侧菜单不会显示该页面选项
 *  icon: { String } (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标
 * }
 */

import Main from "@/pages/Main.vue";

export default [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录"
    },
    component: () => import("../pages/Login.vue")
  },
  {
    path: "/",
    component: Main,
    children: [
      // 首页
      {
        path: "",
        name: "home",
        meta: {
          title: "首页",
          icon: "home",
          hideInMenu: true
        },
        redirect: { name: "organization" }
      },
      // 组织机构
      {
        path: "organization",
        name: "organization",
        meta: {
          title: "组织机构",
          icon: "cluster"
        },
        component: () => import("../views/Organization.vue"),
        redirect: { name: "organization-index" },
        children: [
          {
            path: "index",
            name: "organization-index",
            meta: {
              hideInMenu: true
            },
            component: () =>
              import("../components/organization/OrganizationIndex.vue")
          },
          {
            path: "add",
            name: "organization-add",
            meta: {
              hideInMenu: true
            },
            component: () =>
              import("../components/organization/OrganizationEdit.vue")
          },
          {
            path: "edit/:id",
            name: "organization-edit",
            meta: {
              hideInMenu: true
            },
            component: () =>
              import("../components/organization/OrganizationEdit.vue")
          },
          {
            path: "sort",
            name: "organization-sort",
            meta: {
              hideInMenu: true
            },
            component: () => import("../views/common/TheSort.vue")
          }
        ]
      },
      // 用户管理
      {
        path: "user",
        name: "user",
        meta: {
          title: "用户管理",
          icon: "team"
        },
        component: () => import("../views/User.vue"),
        redirect: { name: "user-index" },
        children: [
          {
            path: "index",
            name: "user-index",
            meta: {
              hideInMenu: true
            },
            component: () => import("../components/user/UserIndex.vue")
          },
          {
            path: "add",
            name: "user-add",
            meta: {
              hideInMenu: true
            },
            component: () => import("../components/user/UserEdit.vue")
          },
          {
            path: "edit/:id",
            name: "user-edit",
            meta: {
              hideInMenu: true
            },
            component: () => import("../components/user/UserEdit.vue")
          },
          {
            path: "sort",
            name: "user-sort",
            meta: {
              hideInMenu: true
            },
            component: () => import("../views/common/TheSort.vue")
          }
        ]
      },
      // 企业 => 企业简介 && 企业风光 && 企业印象 && 企业成果
      {
        path: "company",
        name: "company",
        meta: {
          title: "企业",
          icon: "bank"
        },
        component: () => import("../views/company/Company.vue"),
        children: [
          {
            path: "profile",
            name: "company-profile",
            meta: {
              title: "企业简介",
              icon: "profile"
            },
            component: () => import("../views/company/CompanyProfile.vue")
          },
          {
            path: "scenery",
            name: "company-scenery",
            meta: {
              title: "企业风光",
              icon: "picture"
            },
            component: () => import("../views/company/CompanyScenery.vue")
          },
          {
            path: "scenery/add",
            name: "company-scenery-add",
            meta: {
              hideInMenu: true
            },
            component: () => import("../views/company/CompanySceneryEdit.vue")
          },
          {
            path: "scenery/edit/:id",
            name: "company-scenery-edit",
            meta: {
              hideInMenu: true
            },
            component: () => import("../views/company/CompanySceneryEdit.vue")
          },
          {
            path: "scenery/sort",
            name: "company-scenery-sort",
            meta: {
              hideInMenu: true
            },
            component: () => import("../views/common/TheSort.vue")
          },
          {
            path: "impression",
            name: "company-impression",
            meta: {
              title: "企业印象",
              icon: "tags"
            },
            component: () => import("../views/company/CompanyImpression.vue")
          },
          {
            path: "impression/add",
            name: "company-impression-add",
            meta: {
              hideInMenu: true
            },
            component: () =>
              import("../views/company/CompanyImpressionEdit.vue")
          },
          {
            path: "impression/edit/:id",
            name: "company-impression-edit",
            meta: {
              hideInMenu: true
            },
            component: () =>
              import("../views/company/CompanyImpressionEdit.vue")
          },
          {
            path: "achievement",
            name: "company-achievement",
            meta: {
              title: "企业成果",
              icon: "trophy"
            },
            component: () => import("../views/company/CompanyAchievement.vue")
          },
          {
            path: "achievement/add",
            name: "company-achievement-add",
            meta: {
              hideInMenu: true
            },
            component: () =>
              import("../views/company/CompanyAchievementEdit.vue")
          },
          {
            path: "achievement/edit/:id",
            name: "company-achievement-edit",
            meta: {
              hideInMenu: true
            },
            component: () =>
              import("../views/company/CompanyAchievementEdit.vue")
          }
        ]
      },
      // 主要成员
      {
        path: "member",
        name: "member",
        meta: {
          title: "主要成员",
          icon: "user"
        },
        component: () => import("../views/member/Member.vue")
      },
      {
        path: "member/add",
        name: "member-add",
        meta: {
          hideInMenu: true
        },
        component: () => import("../views/member/MemberEdit.vue")
      },
      {
        path: "member/edit/:id",
        name: "member-edit",
        meta: {
          hideInMenu: true
        },
        component: () => import("../views/member/MemberEdit.vue")
      },
      {
        path: "member/sort",
        name: "member-sort",
        meta: {
          hideInMenu: true
        },
        component: () => import("../views/common/TheSort.vue")
      },
      {
        path: "member/detail/:id",
        name: "member-detail",
        meta: {
          hideInMenu: true
        },
        component: () => import("../views/member/MemberDetail.vue")
      },
      // 板块管理
      {
        path: "plate",
        name: "plate",
        meta: {
          title: "板块管理",
          icon: "appstore"
        },
        component: () => import("../views/plate/Plate.vue")
      },
      {
        path: "plate/add",
        name: "plate-add",
        meta: {
          hideInMenu: true
        },
        component: () => import("../views/plate/PlateEdit.vue")
      },
      {
        path: "plate/edit/:id",
        name: "plate-edit",
        meta: {
          hideInMenu: true
        },
        component: () => import("../views/plate/PlateEdit.vue")
      },
      {
        path: "plate/sort",
        name: "plate-sort",
        meta: {
          hideInMenu: true
        },
        component: () => import("../views/common/TheSort.vue")
      },
      // 信息发布
      {
        path: "information",
        name: "information",
        meta: {
          title: "信息发布",
          icon: "form"
        },
        component: () => import("../views/Information.vue"),
        redirect: { name: "information-index" },
        children: [
          {
            path: "index",
            name: "information-index",
            meta: {
              hideInMenu: true
            },
            component: () =>
              import("../components/information/InformationIndex.vue")
          },
          {
            path: "add",
            name: "information-add",
            meta: {
              hideInMenu: true
            },
            component: () =>
              import("../components/information/InformationEdit.vue")
          },
          {
            path: "edit/:id",
            name: "information-edit",
            meta: {
              hideInMenu: true
            },
            component: () =>
              import("../components/information/InformationEdit.vue")
          }
        ]
      },
      // 统计分析 => 发布数量统计 && 阅读数量统计
      {
        path: "statistics",
        name: "statistics",
        meta: {
          title: "统计分析",
          icon: "bar-chart"
        },
        component: () => import("../views/statistics/Statistics.vue"),
        children: [
          {
            path: "release",
            name: "statistics-release",
            meta: {
              title: "发布数量统计",
              icon: "pie-chart"
            },
            component: () => import("../views/statistics/StatisticsRelease.vue")
          },
          {
            path: "read",
            name: "statistics-read",
            meta: {
              title: "阅读数量统计",
              icon: "line-chart"
            },
            component: () => import("../views/statistics/StatisticsRead.vue")
          }
        ]
      },
      // 日志管理
      {
        path: "log",
        name: "log",
        meta: {
          title: "日志管理",
          icon: "file-text"
        },
        component: () => import("../views/log/Log.vue")
      },
      {
        path: "log/detail/:id",
        name: "log-detail",
        meta: {
          hideInMenu: true
        },
        component: () => import("../views/log/LogDetail.vue")
      },
      // 商品 => 分类管理 && 商品管理 && 商品入库 && 入库记录
      {
        path: "shop",
        name: "shop",
        meta: {
          title: "商品",
          icon: "shop"
        },
        component: () => import("../views/shop/Shop.vue"),
        children: [
          // 分类管理
          {
            path: "classify",
            name: "shop-classify",
            meta: {
              title: "分类管理",
              icon: "appstore"
            },
            component: () => import("../views/shop/ShopClassify.vue"),
            redirect: { name: "shop-classify-index" },
            children: [
              {
                path: "index",
                name: "shop-classify-index",
                meta: {
                  hideInMenu: true
                },
                component: () => import("../views/shop/ShopClassifyIndex.vue")
              },
              {
                path: "add",
                name: "shop-classify-add",
                meta: {
                  hideInMenu: true
                },
                component: () => import("../views/shop/ShopClassifyEdit.vue")
              },
              {
                path: "edit/:id",
                name: "shop-classify-edit",
                meta: {
                  hideInMenu: true
                },
                component: () => import("../views/shop/ShopClassifyEdit.vue")
              },
              {
                path: "sort",
                name: "shop-classify-sort",
                meta: {
                  hideInMenu: true
                },
                component: () => import("../views/common/TheSort.vue")
              }
            ]
          },
          // 商品管理
          {
            path: "management",
            name: "shop-management",
            meta: {
              title: "商品管理",
              icon: "shopping"
            },
            component: () => import("../views/shop/ShopManagement.vue"),
            redirect: { name: "shop-management-index" },
            children: [
              {
                path: "index",
                name: "shop-management-index",
                meta: {
                  hideInMenu: true
                },
                component: () => import("../views/shop/ShopManagementIndex.vue")
              },
              {
                path: "add",
                name: "shop-management-add",
                meta: {
                  hideInMenu: true
                },
                component: () => import("../views/shop/ShopManagementEdit.vue")
              },
              {
                path: "edit/:id",
                name: "shop-management-edit",
                meta: {
                  hideInMenu: true
                },
                component: () => import("../views/shop/ShopManagementEdit.vue")
              }
            ]
          },
          // 入库管理
          {
            path: "record",
            name: "shop-record",
            meta: {
              title: "入库管理",
              icon: "file-done"
            },
            component: () => import("../views/shop/ShopRecord.vue"),
            redirect: { name: "shop-record-index" },
            children: [
              {
                path: "index",
                name: "shop-record-index",
                meta: {
                  hideInMenu: true
                },
                component: () => import("../views/shop/ShopRecordIndex.vue")
              },
              {
                path: "detail/:id",
                name: "shop-record-detail",
                meta: {
                  hideInMenu: true
                },
                component: () => import("../views/shop/ShopRecordDetail.vue")
              },
              {
                path: "storage",
                name: "shop-record-storage",
                meta: {
                  hideInMenu: true
                },
                component: () => import("../views/shop/ShopRecordStorage.vue")
              }
            ]
          }
        ]
      }
    ]
  }
];
