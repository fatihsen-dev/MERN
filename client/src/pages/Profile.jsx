import { useSelector } from "react-redux";
import Avvvatars from "avvvatars-react";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className='flex pt-5 h-full items-start gap-10'>
      <div className='inline-flex flex-col items-center gap-2 bg-blue-500/20 p-2 rounded-sm'>
        <Avvvatars radius={2} style={`shape`} size='170' value={user?.fullname} />
        <div className='flex flex-col w-full'>
          <span className='font-semibold'>{user?.fullname ?? "Default Name"}</span>
          <span className='text-sm text-black/70'>
            {user?.email ?? "default@gmail.com"}
          </span>
        </div>
      </div>
      <div className='flex-1 h-full overflow-auto'></div>
    </div>
  );
}
