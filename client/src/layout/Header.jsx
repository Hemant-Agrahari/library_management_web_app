import React from "react";
import settingIcon from "../assets/setting.png";
import userIcon from "../assets/user.png";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
const updateDateTime = () => {
  const dispatch = useDispatch();
  const now = new Date();
  const hour = now.getHours() % 12 || 12;
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = now.getHours() < 12 ? "AM" : "PM";
  setCurrentTime(`${hour}:${minutes} ${ampm}`);
  const options={month: 'short', dat: 'numeric', year: 'numeric'};
  setCurrentDate(now.toLocaleDateString('en-US', options));
}
updateDateTime();
const interval = setInterval(updateDateTime, 1000);
return () => clearInterval(interval);
  }, []);
  return <></>;
};

export default Header;
