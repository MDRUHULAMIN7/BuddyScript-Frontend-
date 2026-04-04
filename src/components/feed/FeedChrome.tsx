"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { useState, type ChangeEventHandler, type ReactNode } from "react";
import { routes } from "@/lib/constants/routes";
import type { User } from "@/lib/types/common";
import { getAssetUrl, getFullName } from "@/lib/utils/format";

type FeedChromeProps = {
  children: ReactNode;
  currentUser: User;
  isDark: boolean;
  showNotifications: boolean;
  showProfileMenu: boolean;
  onToggleDark: () => void;
  onToggleNotifications: () => void;
  onToggleProfile: () => void;
  onLogout: () => Promise<void> | void;
};

type ExploreItem = {
  label: string;
  badge?: string;
  icon: ({ className }: { className?: string }) => ReactNode;
};

type StoryCard = {
  name: string;
  image: string;
  mini?: string;
  isMine?: boolean;
};

type FriendItem = {
  name: string;
  title: string;
  time: string;
  image: string;
};

type PersonCard = {
  name: string;
  title: string;
  image: string;
};

const exploreItems: ExploreItem[] = [
  { label: "Learning", badge: "New", icon: ExploreLearningIcon },
  { label: "Insights", icon: ExploreInsightsIcon },
  { label: "Find friends", icon: ExploreFindFriendsIcon },
  { label: "Bookmarks", icon: ExploreBookmarksIcon },
  { label: "Group", icon: ExploreGroupIcon },
  { label: "Gaming", badge: "New", icon: ExploreGamingIcon },
  { label: "Settings", icon: ExploreSettingsIcon },
  { label: "Save post", icon: ExploreSavePostIcon },
];

const stories: StoryCard[] = [
  { name: "Your Story", image: "/assets/images/card_ppl1.png", isMine: true },
  { name: "Ryan Roslansky", image: "/assets/images/card_ppl2.png", mini: "/assets/images/mini_pic.png" },
  { name: "Ryan Roslansky", image: "/assets/images/card_ppl3.png", mini: "/assets/images/mini_pic.png" },
  { name: "Ryan Roslansky", image: "/assets/images/card_ppl4.png", mini: "/assets/images/mini_pic.png" },
];

const mobileStories: StoryCard[] = [
  { name: "Your Story", image: "/assets/images/mobile_story_img.png", isMine: true },
  { name: "Ryan...", image: "/assets/images/mobile_story_img1.png" },
  { name: "Ryan...", image: "/assets/images/mobile_story_img2.png" },
  { name: "Ryan...", image: "/assets/images/mobile_story_img1.png" },
  { name: "Ryan...", image: "/assets/images/mobile_story_img2.png" },
];

const notifications = [
  { name: "Steve Jobs", text: "sent you a follow request", image: "/assets/images/profile.png" },
  { name: "Dylan Field", text: "mentioned you in a comment", image: "/assets/images/profile-1.png" },
];

const friends: FriendItem[] = [
  { name: "Steve Jobs", title: "CEO of Apple", time: "5 minute ago", image: "/assets/images/profile.png" },
  { name: "Ryan Roslansky", title: "CEO of Linkedin", time: "Online", image: "/assets/images/people1.png" },
  { name: "Dylan Field", title: "CEO of Figma", time: "Online", image: "/assets/images/people2.png" },
  { name: "Steve Jobs", title: "CEO of Apple", time: "5 minute ago", image: "/assets/images/profile.png" },
];

const mightLikePeople: PersonCard[] = [
  { name: "Radovan SkillArena", title: "Founder & CEO at Trophy", image: "/assets/images/people3.png" },
];

const suggestedPeople: PersonCard[] = [
  { name: "Steve Jobs", title: "CEO of Apple", image: "/assets/images/people1.png" },
  { name: "Ryan Roslansky", title: "CEO of Linkedin", image: "/assets/images/people2.png" },
  { name: "Dylan Field", title: "CEO of Figma", image: "/assets/images/people3.png" },
];

const eventCards = [
  { date: "10", month: "Jul", title: "No more terrorism no more cry", image: "/assets/images/feed_event1.png" },
  { date: "10", month: "Jul", title: "No more terrorism no more cry", image: "/assets/images/feed_event1.png" },
];

export function FeedChrome({
  children,
  currentUser,
  isDark,
  showNotifications,
  showProfileMenu,
  onToggleDark,
  onToggleNotifications,
  onToggleProfile,
  onLogout,
}: FeedChromeProps) {
  return (
    <div className={clsx("min-h-screen", isDark ? "bg-[#111f34]" : "bg-[#f5f7fb]")}>
      <ThemeToggle isDark={isDark} onToggleDark={onToggleDark} />
      <TopNavbar
        currentUser={currentUser}
        isDark={isDark}
        showNotifications={showNotifications}
        showProfileMenu={showProfileMenu}
        onToggleNotifications={onToggleNotifications}
        onToggleProfile={onToggleProfile}
        onLogout={onLogout}
      />
      <MobileHeader currentUser={currentUser} isDark={isDark} onToggleProfile={onToggleProfile} />

      <main className="mx-auto w-full max-w-[1360px] px-4 pb-24 pt-4 lg:px-5 xl:px-6">
        <div className="grid gap-4 lg:grid-cols-[252px_minmax(0,1fr)_252px] xl:grid-cols-[282px_minmax(0,1fr)_282px]">
          <LeftSidebar isDark={isDark} />

          <section className="min-w-0">
            <StoryStrip isDark={isDark} />
            <div className="mt-4">{children}</div>
          </section>

          <RightSidebar isDark={isDark} />
        </div>
      </main>

      <MobileBottomNav isDark={isDark} />
    </div>
  );
}

function TopNavbar({
  currentUser,
  isDark,
  showNotifications,
  showProfileMenu,
  onToggleNotifications,
  onToggleProfile,
  onLogout,
}: Omit<FeedChromeProps, "children" | "onToggleDark">) {
  return (
    <header
      className={clsx(
        "sticky top-0 z-40 hidden border-b backdrop-blur lg:block",
        isDark ? "border-white/6 bg-[#13253a]/95" : "border-black/5 bg-white/95",
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1360px] items-center gap-6 px-5 xl:px-6">
        <Link href={routes.feed} className="shrink-0">
          <img src="/assets/images/logo.svg" alt="BuddyScript" className="h-10 w-auto" />
        </Link>

        <div className="max-w-[424px] flex-1">
          <SearchField isDark={isDark} placeholder="input search text" variant="navbar" />
        </div>

        <nav className="ml-auto flex items-center gap-2 xl:gap-3">
          <NavIconButton active isDark={isDark} ariaLabel="Home">
            <HomeNavIcon />
          </NavIconButton>
          <NavIconButton isDark={isDark} ariaLabel="Friends">
            <FriendsNavIcon />
          </NavIconButton>
          <div className="relative">
            <NavIconButton isDark={isDark} badge="6" ariaLabel="Notifications" onClick={onToggleNotifications}>
              <NotificationNavIcon />
            </NavIconButton>
            {showNotifications ? (
              <div
                className={clsx(
                  "absolute right-0 top-[58px] w-[304px] rounded-[20px] border p-4 shadow-[0_26px_60px_rgba(17,32,50,0.18)]",
                  isDark ? "border-white/8 bg-[#15243a]" : "border-black/6 bg-white",
                )}
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className={clsx("text-base font-semibold", isDark ? "text-white" : "text-[#112032]")}>Notifications</h3>
                  <button type="button" className="text-sm font-medium text-[#1890ff]">
                    See All
                  </button>
                </div>
                <div
                  className={clsx(
                    "rounded-[18px] border p-3",
                    isDark ? "border-[#1890ff]/18 bg-[#102036]" : "border-[#1890ff]/18 bg-[#f6fbff]",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <img src="/assets/images/friend-req.png" alt="Follow request" className="h-12 w-12 rounded-full object-cover" />
                    <div className="min-w-0">
                      <p className={clsx("truncate text-sm font-semibold", isDark ? "text-white" : "text-[#112032]")}>Dylan Field</p>
                      <p className={clsx("truncate text-xs", isDark ? "text-white/55" : "text-black/55")}>sent you a follow request</p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <PillButton label="Ignore" isPrimary={false} isDark={isDark} />
                    <PillButton label="Follow" isPrimary isDark={isDark} />
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  {notifications.map((item) => (
                    <div key={item.name + item.text} className="flex items-center gap-3 rounded-[16px] px-2 py-2">
                      <img src={item.image} alt={item.name} className="h-11 w-11 rounded-full object-cover" />
                      <div className="min-w-0">
                        <p className={clsx("truncate text-sm font-semibold", isDark ? "text-white" : "text-[#112032]")}>{item.name}</p>
                        <p className={clsx("truncate text-xs", isDark ? "text-white/55" : "text-black/45")}>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <NavIconButton isDark={isDark} badge="2" ariaLabel="Messages">
            <ChatNavIcon />
          </NavIconButton>

          <div className="relative ml-1">
            <button
              type="button"
              onClick={onToggleProfile}
              className={clsx(
                "flex items-center gap-3 rounded-full px-2 py-2 transition",
                isDark ? "hover:bg-white/6" : "hover:bg-black/4",
              )}
            >
              <img
                src={getAssetUrl(currentUser.profilePicture || "/assets/images/profile-1.png")}
                alt={getFullName(currentUser.firstName, currentUser.lastName)}
                className="h-9 w-9 rounded-full object-cover ring-2 ring-[#1890ff]"
              />
              <span className={clsx("max-w-[132px] truncate text-[15px] font-semibold", isDark ? "text-white" : "text-[#112032]")}>
                {getFullName(currentUser.firstName, currentUser.lastName)}
              </span>
              <ProfileChevronIcon className={isDark ? "text-white/65" : "text-black/50"} />
            </button>
            {showProfileMenu ? (
              <div
                className={clsx(
                  "absolute right-0 top-[58px] w-[362px] rounded-[22px] border px-6 py-5 shadow-[0_26px_60px_rgba(17,32,50,0.18)]",
                  isDark ? "border-white/8 bg-[#15243a]" : "border-black/6 bg-white",
                )}
              >
                <div className="mb-4 flex items-center gap-4">
                  <img
                    src={getAssetUrl(currentUser.profilePicture || "/assets/images/profile-1.png")}
                    alt={getFullName(currentUser.firstName, currentUser.lastName)}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-[#1890ff]"
                  />
                  <div>
                    <h3 className={clsx("text-[18px] font-semibold", isDark ? "text-white" : "text-[#112032]")}>
                      {getFullName(currentUser.firstName, currentUser.lastName)}
                    </h3>
                    <Link href={routes.feed} className="text-[15px] font-medium text-[#1890ff]">
                      View Profile
                    </Link>
                  </div>
                </div>
                <div className="space-y-2">
                  <ProfileActionButton isDark={isDark} icon={<ExploreSettingsIcon className="text-[#1890ff]" />} label="Settings" />
                  <ProfileActionButton isDark={isDark} icon={<HelpIcon className="text-[#1890ff]" />} label="Help & Support" />
                  <ProfileActionButton isDark={isDark} icon={<LogoutIcon className="text-[#1890ff]" />} label="Log Out" onClick={onLogout} />
                </div>
              </div>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  );
}

function MobileHeader({
  currentUser,
  isDark,
  onToggleProfile,
}: {
  currentUser: User;
  isDark: boolean;
  onToggleProfile: () => void;
}) {
  return (
    <header
      className={clsx(
        "sticky top-0 z-30 border-b px-4 py-3 lg:hidden",
        isDark ? "border-white/6 bg-[#13253a]" : "border-black/5 bg-white",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <img src="/assets/images/logo.svg" alt="BuddyScript" className="h-9 w-auto" />
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={clsx("grid h-10 w-10 place-items-center rounded-full", isDark ? "bg-white/6" : "bg-black/4")}
          >
            <SearchIcon className={isDark ? "text-white/70" : "text-black/55"} />
          </button>
          <button type="button" onClick={onToggleProfile} className="flex items-center gap-2 rounded-full px-2 py-1">
            <img
              src={getAssetUrl(currentUser.profilePicture || "/assets/images/profile-1.png")}
              alt={getFullName(currentUser.firstName, currentUser.lastName)}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-[#1890ff]"
            />
            <ProfileChevronIcon className={isDark ? "text-white/65" : "text-black/55"} />
          </button>
        </div>
      </div>
    </header>
  );
}

function LeftSidebar({ isDark }: { isDark: boolean }) {
  return (
    <aside className="hidden lg:block">
      <div className="space-y-4">
        <SidebarCard isDark={isDark} className="p-6">
          <h2 className={clsx("text-[18px] font-semibold", isDark ? "text-white" : "text-[#112032]")}>Explore</h2>
          <div className="mt-6 space-y-6">
            {exploreItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={clsx(
                  "flex w-full items-center justify-between gap-4 text-left transition",
                  isDark ? "text-white/76 hover:text-[#1890ff]" : "text-[#5b6270] hover:text-[#1890ff]",
                )}
              >
                <span className="flex items-center gap-4">
                  <span className="grid h-6 w-6 place-items-center">
                    <item.icon className={isDark ? "text-white/55" : "text-[#7a808d]"} />
                  </span>
                  <span className="text-[16px] font-medium">{item.label}</span>
                </span>
                {item.badge ? (
                  <span className="rounded-full bg-[#10dd88] px-2 py-1 text-[12px] font-semibold leading-none text-white">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </SidebarCard>

        <SidebarCard isDark={isDark} className="p-6">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className={clsx("text-[20px] font-medium leading-[1.4]", isDark ? "text-white" : "text-[#212121]")}>
              Suggested People
            </h2>
            <button type="button" className="text-[12px] font-medium leading-[18px] text-[#1890ff]">
              See All
            </button>
          </div>
          <div className="space-y-6">
            {suggestedPeople.map((person, index) => (
              <div key={person.name} className={clsx(index === suggestedPeople.length - 1 ? "" : "")}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <img
                      src={person.image}
                      alt={person.name}
                      className={clsx(
                        "shrink-0 rounded-full object-cover",
                        index === 0 ? "h-10 w-10" : "h-[37px] w-[37px]",
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <p className={clsx("truncate text-[14px] font-medium leading-[1.1]", isDark ? "text-white" : "text-[#212121]")}>
                        {person.name}
                      </p>
                      <p className={clsx("truncate text-[11px] font-light leading-[1.4]", isDark ? "text-white/58" : "text-[#212121]")}>
                        {person.title}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={clsx(
                      "inline-flex h-[30px] items-center justify-center rounded-[2px] border px-[7px] text-[12px] font-medium leading-[1.4] transition",
                      isDark
                        ? "border-white/10 bg-transparent text-white/68 hover:border-[#1890ff] hover:bg-[#1890ff] hover:text-white"
                        : "border-[#dcdfe4] bg-white text-[#959eae] hover:border-[#1890ff] hover:bg-[#1890ff] hover:text-white",
                    )}
                  >
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </SidebarCard>

        <SidebarCard isDark={isDark} className="p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className={clsx("text-[20px] font-medium leading-[1.4]", isDark ? "text-white" : "text-[#212121]")}>Events</h2>
            <button type="button" className="text-[12px] font-medium leading-[18px] text-[#1890ff]">
              See all
            </button>
          </div>
          <div className="mt-6 space-y-4">
            {eventCards.map((event, index) => (
              <div
                key={event.title + index}
                className={clsx(
                  "overflow-hidden rounded-[6px] border shadow-[0_4px_8px_rgba(0,0,0,0.08)]",
                  isDark ? "border-white/8 bg-[#13253a] shadow-none" : "border-black/5 bg-white",
                )}
              >
                <img src={event.image} alt={event.title} className="h-[188px] w-full object-cover" />
                <div className="flex items-center gap-3 px-4 pb-4 pt-5">
                  <div className="rounded-[2px] bg-[#0acf83] px-3 py-2 text-center text-white">
                    <p className="text-[18px] font-bold leading-none">{event.date}</p>
                    <p className="text-[18px] font-normal leading-none">{event.month}</p>
                  </div>
                  <p className={clsx("text-[16px] font-medium leading-[1.4]", isDark ? "text-white" : "text-black")}>
                    {event.title}
                  </p>
                </div>
                <div className={clsx("mx-4 border-t pb-3 pt-3", isDark ? "border-white/8" : "border-[#dfdfdf]")}>
                  <div className="flex items-center justify-between">
                    <span className={clsx("text-[12px] font-medium", isDark ? "text-white/45" : "text-black/35")}>17 People Going</span>
                    <button
                      type="button"
                      className="inline-flex h-8 items-center justify-center rounded-[2px] border border-[#1890ff] bg-[#f3f9ff] px-7 text-[12px] font-medium text-[#1890ff]"
                    >
                      Going
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SidebarCard>
      </div>
    </aside>
  );
}

function StoryStrip({ isDark }: { isDark: boolean }) {
  return (
    <>
      <div className="relative hidden lg:block">
        <div className="grid grid-cols-4 gap-4">
          {stories.map((story) => (
            <div key={story.name + story.image} className="relative overflow-hidden rounded-[6px]">
              <img src={story.image} alt={story.name} className="h-[152px] w-full object-cover" />
              <div className="absolute inset-0 rounded-[6px] bg-black/50" />
              {story.isMine ? (
                <div className="absolute bottom-0 left-0 right-0 rounded-t-[25.5px] bg-[#112032] pb-[10px] pt-[30px]">
                  <button
                    type="button"
                    className="absolute left-1/2 top-0 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-[#112032] bg-[#1890ff] text-white"
                  >
                    +
                  </button>
                  <p className="text-center text-[12px] font-medium leading-[19px] text-white">{story.name}</p>
                </div>
              ) : (
                <>
                  {story.mini ? (
                    <img
                      src={story.mini}
                      alt=""
                      className="absolute right-3 top-3 h-7 w-7 rounded-full border-2 border-white object-cover"
                    />
                  ) : null}
                  <p className="absolute bottom-[10px] left-0 right-0 px-3 text-center text-[12px] font-medium leading-[19px] text-white">
                    {story.name}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="absolute right-[-5px] top-1/2 -translate-y-1/2">
          <button
            type="button"
            className={clsx(
              "grid h-6 w-6 place-items-center rounded-full border text-white",
              isDark ? "border-[#111f34] bg-[#1890ff]" : "border-white bg-[#1890ff]",
            )}
          >
            <RightChevronIcon className="h-[13px] w-[13px]" />
          </button>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {mobileStories.map((story) => (
            <div key={story.name + story.image} className="min-w-[60px] text-center">
              <div
                className={clsx(
                  "relative mx-auto h-[60px] w-[60px] overflow-hidden rounded-full p-[2px]",
                  story.isMine ? "bg-transparent" : story.image.includes("img1") ? "bg-[#1890ff]" : "bg-[#c4c4c4]",
                )}
              >
                <img src={story.image} alt={story.name} className="h-full w-full rounded-full object-cover" />
                {story.isMine ? (
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 grid h-5 w-5 place-items-center rounded-full border border-white bg-[#1890ff] text-[12px] text-white"
                  >
                    +
                  </button>
                ) : null}
              </div>
              <p className={clsx("mt-2 text-[12px] font-medium", isDark ? "text-white/75" : "text-[#112032]")}>{story.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function RightSidebar({ isDark }: { isDark: boolean }) {
  const [friendSearch, setFriendSearch] = useState("");
  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(friendSearch.toLowerCase()),
  );

  return (
    <aside className="hidden lg:block">
      <div className="space-y-4">
        <SidebarCard isDark={isDark} className="p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className={clsx("text-[18px] font-semibold", isDark ? "text-white" : "text-[#112032]")}>You Might Like</h2>
            <button type="button" className="text-[12px] font-medium leading-[18px] text-[#1890ff]">
              See All
            </button>
          </div>
          <div className="mt-5 space-y-5">
            {mightLikePeople.map((person) => (
              <div key={person.name}>
                <div className={clsx("flex items-center gap-4 border-b pb-5", isDark ? "border-white/8" : "border-black/6")}>
                  <img src={person.image} alt={person.name} className="h-14 w-14 rounded-full object-cover" />
                  <div className="min-w-0">
                    <p className={clsx("truncate text-[16px] font-medium leading-[1.4]", isDark ? "text-white" : "text-[#212121]")}>{person.name}</p>
                    <p className={clsx("truncate text-[14px]", isDark ? "text-white/58" : "text-black/48")}>{person.title}</p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <PillButton label="Ignore" isPrimary={false} isDark={isDark} />
                  <PillButton label="Follow" isPrimary isDark={isDark} />
                </div>
              </div>
            ))}
          </div>
        </SidebarCard>

        <SidebarCard isDark={isDark} className="p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className={clsx("text-[18px] font-semibold", isDark ? "text-white" : "text-[#112032]")}>Your Friends</h2>
            <button type="button" className="text-[12px] font-medium leading-[18px] text-[#1890ff]">
              See All
            </button>
          </div>
          <div className="mt-6">
            <SearchField
              isDark={isDark}
              placeholder="input search text"
              variant="compact"
              value={friendSearch}
              onChange={(event) => setFriendSearch(event.target.value)}
            />
          </div>
          <div className="mt-6 space-y-3">
            {filteredFriends.map((friend) => (
              <div
                key={friend.name + friend.time}
                className={clsx(
                  "flex items-center justify-between gap-3 rounded-[8px] p-[6px] transition",
                  isDark ? "hover:bg-white/6" : "hover:bg-[#e4e6e9]",
                )}
              >
                <div className="flex min-w-0 items-center gap-4">
                  <img src={friend.image} alt={friend.name} className="h-10 w-10 rounded-full object-cover" />
                  <div className="min-w-0">
                    <p className={clsx("truncate text-[14px] font-medium leading-[1.4]", isDark ? "text-white" : "text-[#212121]")}>{friend.name}</p>
                    <p className={clsx("truncate text-[11px] leading-[1.4]", isDark ? "text-white/58" : "text-[#212121]")}>{friend.title}</p>
                  </div>
                </div>
                <span className={clsx("shrink-0 text-[11px] leading-[21px]", isDark ? "text-white/46" : "text-black/46")}>{friend.time}</span>
              </div>
            ))}
          </div>
        </SidebarCard>
      </div>
    </aside>
  );
}

function SidebarCard({
  children,
  className,
  isDark,
}: {
  children: ReactNode;
  className?: string;
  isDark: boolean;
}) {
  return (
    <div className={clsx("rounded-[6px]", className, isDark ? "bg-[#15243a]" : "bg-white")}>
      {children}
    </div>
  );
}

function SearchField({
  isDark,
  placeholder,
  value,
  onChange,
  variant = "compact",
}: {
  isDark: boolean;
  placeholder: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  variant?: "compact" | "navbar";
}) {
  return (
    <label
      className={clsx(
        "flex h-10 items-center gap-3 rounded-full border px-[18px] transition",
        variant === "navbar"
          ? isDark
            ? "border-[#26344c] bg-[#26344c]"
            : "border-[#f5f5f5] bg-[#f5f5f5]"
          : isDark
            ? "border-[#26344c] bg-[#26344c]"
            : "border-[#f5f5f5] bg-[#f5f5f5]",
      )}
    >
      <SearchIcon className={isDark ? "text-[#1890ff]" : "text-black/45"} />
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(
          "w-full bg-transparent text-[16px] leading-[1.4] outline-none",
          isDark ? "text-white/82 placeholder:text-white/32" : "text-black/52 placeholder:text-black/25",
        )}
      />
    </label>
  );
}

function NavIconButton({
  active = false,
  badge,
  children,
  isDark,
  ariaLabel,
  onClick,
}: {
  active?: boolean;
  badge?: string;
  children: ReactNode;
  isDark: boolean;
  ariaLabel: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={clsx(
        "relative grid h-[72px] w-[56px] place-items-center border-b-2 transition",
        active ? "border-[#1890ff] text-[#1890ff]" : clsx("border-transparent", isDark ? "text-white/70 hover:text-[#1890ff]" : "text-[#6d7380] hover:text-[#1890ff]"),
      )}
    >
      {children}
      {badge ? (
        <span className="absolute right-[8px] top-[11px] grid h-5 min-w-5 place-items-center rounded-full bg-[#1890ff] px-1 text-[10px] font-semibold text-white">
          {badge}
        </span>
      ) : null}
    </button>
  );
}

function PillButton({
  label,
  isPrimary,
  isDark = false,
}: {
  label: string;
  isPrimary: boolean;
  isDark?: boolean;
}) {
  return (
    <button
      type="button"
      className={clsx(
        "inline-flex h-14 items-center justify-center rounded-[6px] border text-[16px] font-medium transition",
        isPrimary
          ? "border-[#377dff] bg-[#377dff] text-white hover:bg-[#1b69f2]"
          : isDark
            ? "border-white/10 bg-transparent text-white/68 hover:border-[#377dff] hover:text-[#377dff]"
            : "border-black/8 bg-white text-[#9398a5] hover:border-[#377dff] hover:text-[#377dff]",
      )}
    >
      {label}
    </button>
  );
}

function ProfileActionButton({
  icon,
  label,
  isDark,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  isDark: boolean;
  onClick?: () => Promise<void> | void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex w-full items-center justify-between gap-4 rounded-[18px] px-3 py-3 text-left transition",
        isDark ? "text-white/80 hover:bg-white/6" : "text-[#5f6674] hover:bg-[#f7faff]",
      )}
    >
      <span className="flex items-center gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-[#f0f5ff]">{icon}</span>
        <span className="text-[16px] font-medium">{label}</span>
      </span>
      <RightChevronIcon className={isDark ? "text-white/30" : "text-black/28"} />
    </button>
  );
}

function ThemeToggle({
  isDark,
  onToggleDark,
}: {
  isDark: boolean;
  onToggleDark: () => void;
}) {
  return (
    <div className="fixed right-2 top-1/2 z-50 hidden -translate-y-1/2 xl:block">
      <button
        type="button"
        onClick={onToggleDark}
        className="relative flex h-[66px] w-[32px] items-center justify-center rounded-full border border-[#1890ff] bg-[#1890ff]"
        aria-label="Toggle theme"
      >
        <span
          className={clsx(
            "absolute left-[6px] h-[18px] w-[18px] rounded-full bg-white transition-all",
            isDark ? "translate-y-[16px]" : "-translate-y-[16px]",
          )}
        />
        <span className="absolute top-[8px]">
          <SunToggleIcon className={isDark ? "text-white/40" : "text-white"} />
        </span>
        <span className="absolute bottom-[8px]">
          <MoonToggleIcon className={isDark ? "text-white" : "text-white/45"} />
        </span>
      </button>
    </div>
  );
}

function MobileBottomNav({ isDark }: { isDark: boolean }) {
  return (
    <nav
      className={clsx(
        "fixed bottom-0 left-0 right-0 z-40 border-t px-4 py-2 shadow-[0_-10px_30px_rgba(17,32,50,0.08)] lg:hidden",
        isDark ? "border-white/8 bg-[#13253a]" : "border-black/6 bg-white",
      )}
    >
      <div className="flex items-center justify-around">
        <MobileNavButton active>
          <HomeNavIcon />
        </MobileNavButton>
        <MobileNavButton>
          <FriendsNavIcon />
        </MobileNavButton>
        <MobileNavButton>
          <NotificationNavIcon />
        </MobileNavButton>
        <MobileNavButton>
          <ChatNavIcon />
        </MobileNavButton>
      </div>
    </nav>
  );
}

function MobileNavButton({
  active = false,
  children,
}: {
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={clsx(
        "relative flex h-12 w-16 items-center justify-center text-[#1890ff]",
        active ? "after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-10 after:-translate-x-1/2 after:bg-[#1890ff] after:content-['']" : "text-[#7f8590]",
      )}
    >
      {children}
    </button>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.25 15a6.75 6.75 0 100-13.5A6.75 6.75 0 008.25 15zM16.5 16.5l-3.675-3.675" />
    </svg>
  );
}

function HomeNavIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M3.5 8.75l7-5.25 7 5.25v8.75a1 1 0 01-1 1h-3.5v-5.25h-5V18.5H4.5a1 1 0 01-1-1V8.75z" />
    </svg>
  );
}

function FriendsNavIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M7 9.5a2.75 2.75 0 100-5.5 2.75 2.75 0 000 5.5zM14.25 8.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zM2.75 17.25a4.25 4.25 0 018.5 0M11 17.25a3.75 3.75 0 017.5 0" />
    </svg>
  );
}

function NotificationNavIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="none" viewBox="0 0 20 22">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M10 21a2.5 2.5 0 002.5-2.5h-5A2.5 2.5 0 0010 21zM4 8a6 6 0 1112 0c0 3 1.25 4.5 2 5.25H2C2.75 12.5 4 11 4 8z" />
    </svg>
  );
}

function ChatNavIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.125 16.625L2.625 18l1.375-3.5A7.875 7.875 0 1110.5 18a7.84 7.84 0 01-4.375-1.375z" />
      <path fill="currentColor" d="M7.5 10.5a1 1 0 100-2 1 1 0 000 2zM10.5 10.5a1 1 0 100-2 1 1 0 000 2zM13.5 10.5a1 1 0 100-2 1 1 0 000 2z" />
    </svg>
  );
}

function ProfileChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="11" height="7" fill="none" viewBox="0 0 11 7">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" d="M1 1.25l4.5 4.5 4.5-4.5" />
    </svg>
  );
}

function RightChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 13 13">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 2.25L8.25 6.5 4 10.75" />
    </svg>
  );
}

function SunToggleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 15 15">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M7.5 1.5v1.5M7.5 12v1.5M3.258 3.258L4.318 4.32M10.682 10.682l1.06 1.06M1.5 7.5H3M12 7.5h1.5M3.258 11.742L4.318 10.68M10.682 4.318l1.06-1.06M7.5 10a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
    </svg>
  );
}

function MoonToggleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 13 13">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M11.292 7.36A5.042 5.042 0 115.64 1.708a4.08 4.08 0 005.651 5.651z" />
    </svg>
  );
}

function ExploreLearningIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22">
      <circle cx="11" cy="11" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path fill="currentColor" d="M9.5 7.75l4.75 3.25-4.75 3.25v-6.5z" />
    </svg>
  );
}

function ExploreInsightsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22">
      <rect x="3.25" y="3.25" width="15.5" height="15.5" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path stroke="currentColor" strokeWidth="1.5" d="M7.5 13.75V10M11 13.75V7.5M14.5 13.75V9" />
    </svg>
  );
}

function ExploreFindFriendsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10a3 3 0 100-6 3 3 0 000 6zM5 18a5 5 0 0110 0M17 8v6M14 11h6" />
    </svg>
  );
}

function ExploreBookmarksIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="none" viewBox="0 0 20 22">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 2.75h10A1.75 1.75 0 0116.75 4.5v14.75L10 15.5l-6.75 3.75V4.5A1.75 1.75 0 015 2.75z" />
    </svg>
  );
}

function ExploreGroupIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.5 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM14.5 10a2 2 0 100-4 2 2 0 000 4zM3.5 17a4 4 0 018 0M12 17a3.5 3.5 0 017 0" />
    </svg>
  );
}

function ExploreGamingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22">
      <rect x="3" y="6.5" width="16" height="9" rx="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M8 11h4M10 9v4M14.75 10.25h.01M16.75 12.25h.01" />
    </svg>
  );
}

function ExploreSettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 14a3 3 0 100-6 3 3 0 000 6z" />
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 12.25v-2.5l-1.95-.48a5.58 5.58 0 00-.55-1.33l1.07-1.7-1.77-1.77-1.7 1.07c-.42-.24-.86-.42-1.33-.55L11.25 3h-2.5l-.48 1.95c-.47.13-.91.31-1.33.55l-1.7-1.07-1.77 1.77 1.07 1.7c-.24.42-.42.86-.55 1.33L4 9.75v2.5l1.95.48c.13.47.31.91.55 1.33l-1.07 1.7 1.77 1.77 1.7-1.07c.42.24.86.42 1.33.55L8.75 19h2.5l.48-1.95c.47-.13.91-.31 1.33-.55l1.7 1.07 1.77-1.77-1.07-1.7c.24-.42.42-.86.55-1.33L18 12.25z" />
    </svg>
  );
}

function ExploreSavePostIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4.25A1.25 1.25 0 015.25 3h9.11L18 6.64v11.11A1.25 1.25 0 0116.75 19H5.25A1.25 1.25 0 014 17.75V4.25z" />
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.5 3v5.5h6V4" />
    </svg>
  );
}

function HelpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M7.875 7.5a2.125 2.125 0 114.25 0c0 1.5-2.125 1.75-2.125 3" />
      <circle cx="10" cy="14.125" r=".75" fill="currentColor" />
    </svg>
  );
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 4.5H5.5A1.5 1.5 0 004 6v8a1.5 1.5 0 001.5 1.5H8M12 13.5l3.5-3.5L12 6.5M15.5 10H8" />
    </svg>
  );
}
