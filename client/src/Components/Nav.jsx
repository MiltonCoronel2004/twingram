import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import {AcmeLogo} from "../assets/Icons/AcmeLogo.jsx";
import {SearchIcon} from "../assets/Icons/SearchIcon.jsx";
import Home from '../assets/Icons/house.svg';
import Friends from '../assets/Icons/friends.svg';
import Inbox from '../assets/Icons/inbox.svg';

const Nav = () => {
  return (
    <Navbar isBordered className="flex justify-between">
      <NavbarContent className="bg-red-800">
      <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
      </NavbarContent>

      <NavbarContent className="bg-green-800">
          <NavbarItem>
            <Link color="foreground" href="/feed">
              <img src={Home} alt="home" width="25px"/>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/friends">
              <img src={Friends} alt="friends" width="25px"/>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground">
              <img src={Inbox} alt="Inbox" width="25px" />
            </Link>
          </NavbarItem>
      </NavbarContent>
    
      <NavbarContent className="bg-yellow-800">
      <Dropdown placement="bottom-end">
          <DropdownTrigger>
          <Avatar showFallback src='https://images.unsplash.com/broken' />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

export default Nav;
