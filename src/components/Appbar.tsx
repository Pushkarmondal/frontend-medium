import { Link, useLocation } from "react-router-dom";
import { Icon } from "../icons/Icon";
import { Avatar } from "./Avatar";
import { PublishButton } from "../icons/PublishButton";

export function Appbar() {
      const location = useLocation();

      return (
            <header className="w-full bg-white border-b border-gray-200 shadow-sm">
                  <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                        <Link to={'/blogs'} className="cursor-pointer">
                              <div className="flex items-center space-x-2">
                                    <Icon />
                                    <span className="text-xl font-size-30 font-semibold text-gray-900">Medium</span>
                              </div>
                        </Link>

                        <Link to={'/addContent'}>
                        {location.pathname === "/blogs" && (
                              <div className="h-10 w-10 ml-150">
                                    <PublishButton />
                              </div>
                        )}
                        </Link>

                        <div>
                              <Avatar name="Pushkar" />
                        </div>
                  </div>
            </header>
      );
}
