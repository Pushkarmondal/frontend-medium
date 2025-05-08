import { Icon } from "../icons/Icon";
import { Avatar } from "./Avatar";

export function Appbar() {
      return (
            <header className="w-full bg-white border-b border-gray-200 shadow-sm">
                  <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                              <Icon />
                              <span className="text-xl font-size-30 font-semibold text-gray-900">Medium</span>
                        </div>
                        <div>
                              <Avatar name="Pushkar" />
                        </div>
                  </div>
            </header>
      );
}
