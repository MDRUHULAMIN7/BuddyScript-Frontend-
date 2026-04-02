"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import type { User } from "@/lib/types/common";
import { routes } from "@/lib/constants/routes";
import { getFullName } from "@/lib/utils/format";

const notifications = [
  {
    image: "/assets/images/friend-req.png",
    content: "Steve Jobs posted a link in your timeline.",
    time: "42 minutes ago",
  },
  {
    image: "/assets/images/profile-1.png",
    content: "An admin changed the name of the group Freelancer usa.",
    time: "42 minutes ago",
  },
  {
    image: "/assets/images/friend-req.png",
    content: "Ryan Roslansky liked your post.",
    time: "12 minutes ago",
  },
];

const suggestedPeople = [
  { name: "Steve Jobs", title: "CEO of Apple", image: "/assets/images/people1.png" },
  { name: "Ryan Roslansky", title: "CEO of Linkedin", image: "/assets/images/people2.png" },
  { name: "Dylan Field", title: "CEO of Figma", image: "/assets/images/people3.png" },
];

const friends = [
  { name: "Steve Jobs", title: "CEO of Apple", image: "/assets/images/people1.png", inactive: true },
  { name: "Ryan Roslansky", title: "CEO of Linkedin", image: "/assets/images/people2.png" },
  { name: "Dylan Field", title: "CEO of Figma", image: "/assets/images/people3.png" },
  { name: "Steve Jobs", title: "CEO of Apple", image: "/assets/images/people1.png", inactive: true },
];

const stories = [
  "/assets/images/card_ppl2.png",
  "/assets/images/card_ppl3.png",
  "/assets/images/card_ppl4.png",
];

type FeedChromeProps = {
  currentUser: User;
  isDark: boolean;
  showNotifications: boolean;
  showProfileMenu: boolean;
  onToggleDark: () => void;
  onToggleNotifications: () => void;
  onToggleProfile: () => void;
  onLogout: () => void;
  children: ReactNode;
};

export function FeedChrome({
  currentUser,
  isDark,
  showNotifications,
  showProfileMenu,
  onToggleDark,
  onToggleNotifications,
  onToggleProfile,
  onLogout,
  children,
}: FeedChromeProps) {
  return (
    <div className={`_layout _layout_main_wrapper${isDark ? " _dark_wrapper" : ""}`}>
      <div className="_layout_mode_swithing_btn">
        <button type="button" className="_layout_swithing_btn_link" onClick={onToggleDark}>
          <div className="_layout_swithing_btn">
            <div className="_layout_swithing_btn_round" />
          </div>
          <div className="_layout_change_btn_ic1">M</div>
          <div className="_layout_change_btn_ic2">S</div>
        </button>
      </div>
      <div className="_main_layout">
        <TopNavbar
          currentUser={currentUser}
          showNotifications={showNotifications}
          showProfileMenu={showProfileMenu}
          onToggleNotifications={onToggleNotifications}
          onToggleProfile={onToggleProfile}
          onLogout={onLogout}
        />
        <MobileHeader currentUser={currentUser} onToggleNotifications={onToggleNotifications} onToggleProfile={onToggleProfile} />
        <div className="container _custom_container">
          <div className="_layout_inner_wrap">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <LeftSidebar />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="_layout_middle_wrap">
                  <div className="_layout_middle_inner">
                    <StoryStrip />
                    {children}
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <RightSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showNotifications ? (
        <div className="buddy-floating-notifications">
          {notifications.map((item, index) => (
            <div className="_notification_box" key={`${item.content}-${index}`}>
              <div className="_notification_image">
                <img src={item.image} alt="Notification" className="_notify_img" />
              </div>
              <div className="_notification_txt">
                <p className="_notification_para">{item.content}</p>
                <div className="_nitification_time">
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function TopNavbar({
  currentUser,
  showNotifications,
  showProfileMenu,
  onToggleNotifications,
  onToggleProfile,
  onLogout,
}: {
  currentUser: User;
  showNotifications: boolean;
  showProfileMenu: boolean;
  onToggleNotifications: () => void;
  onToggleProfile: () => void;
  onLogout: () => void;
}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light _header_nav _padd_t10">
      <div className="container _custom_container">
        <div className="_logo_wrap">
          <Link className="navbar-brand" href={routes.feed}>
            <img src="/assets/images/logo.svg" alt="Buddy Script" className="_nav_logo" />
          </Link>
        </div>
        <div className="collapse navbar-collapse show">
          <div className="_header_form ms-auto">
            <form className="_header_form_grp">
              <input className="form-control me-2 _inpt1" type="search" placeholder="input search text" aria-label="Search" />
            </form>
          </div>
          <ul className="navbar-nav mb-2 mb-lg-0 _header_nav_list ms-auto _mar_r8">
            <li className="nav-item _header_nav_item">
              <Link className="nav-link _header_nav_link_active _header_nav_link" href={routes.feed}>
                Home
              </Link>
            </li>
            <li className="nav-item _header_nav_item">
              <button type="button" className="nav-link _header_nav_link _header_notify_btn" onClick={onToggleNotifications}>
                Notifications <span className="_counting">{showNotifications ? "On" : "3"}</span>
              </button>
            </li>
          </ul>
          <div className="_header_nav_profile">
            <div className="_header_nav_profile_image">
              <img
                src={currentUser.profilePicture || "/assets/images/profile.png"}
                alt={getFullName(currentUser.firstName, currentUser.lastName)}
                className="_nav_profile_img"
              />
            </div>
            <div className="_header_nav_dropdown">
              <p className="_header_nav_para">{getFullName(currentUser.firstName, currentUser.lastName)}</p>
              <button className="_header_nav_dropdown_btn _dropdown_toggle" type="button" onClick={onToggleProfile}>
                v
              </button>
            </div>
            <div className={`_nav_profile_dropdown _profile_dropdown${showProfileMenu ? " show" : ""}`}>
              <div className="_nav_profile_dropdown_info">
                <div className="_nav_profile_dropdown_image">
                  <img
                    src={currentUser.profilePicture || "/assets/images/profile.png"}
                    alt="Profile"
                    className="_nav_drop_img"
                  />
                </div>
                <div className="_nav_profile_dropdown_info_txt">
                  <h4 className="_nav_dropdown_title">{getFullName(currentUser.firstName, currentUser.lastName)}</h4>
                  <span className="_nav_drop_profile">{currentUser.email}</span>
                </div>
              </div>
              <hr />
              <ul className="_nav_dropdown_list">
                <li className="_nav_dropdown_list_item">
                  <button type="button" className="_nav_dropdown_link buddy-reset-button" onClick={onLogout}>
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileHeader({
  currentUser,
  onToggleNotifications,
  onToggleProfile,
}: {
  currentUser: User;
  onToggleNotifications: () => void;
  onToggleProfile: () => void;
}) {
  return (
    <>
      <div className="_header_mobile_menu">
        <div className="_header_mobile_menu_wrap">
          <div className="container">
            <div className="_header_mobile_menu">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div className="_header_mobile_menu_top_inner">
                    <div className="_header_mobile_menu_logo">
                      <Link href={routes.feed} className="_mobile_logo_link">
                        <img src="/assets/images/logo.svg" alt="Buddy Script" className="_nav_logo" />
                      </Link>
                    </div>
                    <div className="_header_mobile_menu_right">
                      <button type="button" className="_header_mobile_search" onClick={onToggleNotifications}>
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="_mobile_navigation_bottom_wrapper">
        <div className="_mobile_navigation_bottom_wrap">
          <div className="conatiner">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12">
                <ul className="_mobile_navigation_bottom_list">
                  <li className="_mobile_navigation_bottom_item">
                    <Link href={routes.feed} className="_mobile_navigation_bottom_link _mobile_navigation_bottom_link_active">
                      Home
                    </Link>
                  </li>
                  <li className="_mobile_navigation_bottom_item">
                    <button type="button" className="_mobile_navigation_bottom_link" onClick={onToggleNotifications}>
                      Alerts
                    </button>
                  </li>
                  <li className="_mobile_navigation_bottom_item">
                    <button type="button" className="_mobile_navigation_bottom_link" onClick={onToggleProfile}>
                      <img
                        src={currentUser.profilePicture || "/assets/images/profile.png"}
                        alt={getFullName(currentUser.firstName, currentUser.lastName)}
                        className="_nav_profile_img"
                      />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function LeftSidebar() {
  return (
    <div className="_layout_left_sidebar_wrap">
      <div className="_layout_left_sidebar_inner">
        <div className="_left_inner_area_explore _padd_t24  _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <h4 className="_left_inner_area_explore_title _title5  _mar_b24">Explore</h4>
          <ul className="_left_inner_area_explore_list">
            <li className="_left_inner_area_explore_item _explore_item">Learning</li>
            <li className="_left_inner_area_explore_item">Insights</li>
            <li className="_left_inner_area_explore_item">Find friends</li>
            <li className="_left_inner_area_explore_item">Bookmarks</li>
            <li className="_left_inner_area_explore_item">Group</li>
            <li className="_left_inner_area_explore_item _explore_item">Gaming</li>
            <li className="_left_inner_area_explore_item">Settings</li>
            <li className="_left_inner_area_explore_item">Save post</li>
          </ul>
        </div>
      </div>
      <div className="_layout_left_sidebar_inner">
        <div className="_left_inner_area_suggest _padd_t24  _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <div className="_left_inner_area_suggest_content _mar_b24">
            <h4 className="_left_inner_area_suggest_content_title _title5">Suggested People</h4>
          </div>
          {suggestedPeople.map((person) => (
            <div className="_left_inner_area_suggest_info" key={person.name}>
              <div className="_left_inner_area_suggest_info_box">
                <div className="_left_inner_area_suggest_info_image">
                  <img src={person.image} alt={person.name} className="_info_img" />
                </div>
                <div className="_left_inner_area_suggest_info_txt">
                  <h4 className="_left_inner_area_suggest_info_title">{person.name}</h4>
                  <p className="_left_inner_area_suggest_info_para">{person.title}</p>
                </div>
              </div>
              <div className="_left_inner_area_suggest_info_link">
                <button type="button" className="_info_link buddy-reset-button">
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StoryStrip() {
  return (
    <>
      <div className="_feed_inner_ppl_card _mar_b16">
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col">
            <div className="_feed_inner_profile_story _b_radious6 ">
              <div className="_feed_inner_profile_story_image">
                <img src="/assets/images/card_ppl1.png" alt="Your story" className="_profile_story_img" />
                <div className="_feed_inner_story_txt">
                  <div className="_feed_inner_story_btn">
                    <button className="_feed_inner_story_btn_link" type="button">
                      +
                    </button>
                  </div>
                  <p className="_feed_inner_story_para">Your Story</p>
                </div>
              </div>
            </div>
          </div>
          {stories.map((story) => (
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col" key={story}>
              <div className="_feed_inner_public_story _b_radious6">
                <div className="_feed_inner_public_story_image">
                  <img src={story} alt="Story" className="_public_story_img" />
                  <div className="_feed_inner_pulic_story_txt">
                    <p className="_feed_inner_pulic_story_para">Ryan Roslansky</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="_feed_inner_ppl_card_mobile _mar_b16">
        <div className="_feed_inner_ppl_card_area">
          <ul className="_feed_inner_ppl_card_area_list">
            <li className="_feed_inner_ppl_card_area_item">
              <button type="button" className="_feed_inner_ppl_card_area_link buddy-reset-button">
                <div className="_feed_inner_ppl_card_area_story">
                  <img src="/assets/images/mobile_story_img.png" alt="Your story" className="_card_story_img" />
                </div>
                <p className="_feed_inner_ppl_card_area_link_txt">Your Story</p>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

function RightSidebar() {
  return (
    <div className="_layout_right_sidebar_wrap">
      <div className="_layout_right_sidebar_inner">
        <div className="_right_inner_area_info _padd_t24  _padd_b24 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <div className="_right_inner_area_info_content _mar_b24">
            <h4 className="_right_inner_area_info_content_title _title5">You Might Like</h4>
          </div>
          <hr className="_underline" />
          {suggestedPeople.map((person) => (
            <div className="_right_inner_area_info_ppl" key={person.name}>
              <div className="_right_inner_area_info_box">
                <div className="_right_inner_area_info_box_image">
                  <img src={person.image} alt={person.name} className="_ppl_img" />
                </div>
                <div className="_right_inner_area_info_box_txt">
                  <h4 className="_right_inner_area_info_box_title">{person.name}</h4>
                  <p className="_right_inner_area_info_box_para">{person.title}</p>
                </div>
              </div>
              <div className="_right_info_btn_grp">
                <button type="button" className="_right_info_btn_link">
                  Ignore
                </button>
                <button type="button" className="_right_info_btn_link _right_info_btn_link_active">
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="_layout_right_sidebar_inner">
        <div className="_feed_right_inner_area_card  _padd_t24  _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <div className="_feed_top_fixed">
            <div className="_feed_right_inner_area_card_content _mar_b24">
              <h4 className="_feed_right_inner_area_card_content_title _title5">Your Friends</h4>
            </div>
            <form className="_feed_right_inner_area_card_form">
              <input className="form-control me-2 _feed_right_inner_area_card_form_inpt" type="search" placeholder="input search text" aria-label="Search" />
            </form>
          </div>
          <div className="_feed_bottom_fixed">
            {friends.map((friend, index) => (
              <div className={`_feed_right_inner_area_card_ppl${friend.inactive ? " _feed_right_inner_area_card_ppl_inactive" : ""}`} key={`${friend.name}-${index}`}>
                <div className="_feed_right_inner_area_card_ppl_box">
                  <div className="_feed_right_inner_area_card_ppl_image">
                    <img src={friend.image} alt={friend.name} className="_box_ppl_img" />
                  </div>
                  <div className="_feed_right_inner_area_card_ppl_txt">
                    <h4 className="_feed_right_inner_area_card_ppl_title">{friend.name}</h4>
                    <p className="_feed_right_inner_area_card_ppl_para">{friend.title}</p>
                  </div>
                </div>
                <div className="_feed_right_inner_area_card_ppl_side">
                  {friend.inactive ? <span>5 minute ago</span> : <span>Online</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
