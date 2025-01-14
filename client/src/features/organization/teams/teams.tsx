import { useQuery } from "@tanstack/react-query";
import { Group, User } from "@/types";
import { useAuthContext } from "@/hooks/useAuthContext";
import Loading from "@/components/Loading";
import getAllGroups from "@/utils/getAllGroups";
import { TeamsList } from "../components/team-list";

async function getGroups(user: User) {
  return getAllGroups(user);
}

export function Teams() {
  const { user } = useAuthContext();

  const { isPending, data, error } = useQuery<Group[]>({
    queryKey: ["AllGroups"],
    queryFn: () => getGroups(user),
  });

  if (isPending) {
    <>
      <div className="hidden p-3 pb-16 md:block mr-10">
        <div className="flex flex-col lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="w-[600px]">
            <Loading />
          </div>
        </div>
      </div>
    </>;
  }

  if (error) {
    console.log(error.message);
    return <>{error.message}</>;
  }

  if (data) {
    return (
      <>
        <div className="hidden md:block mr-10">
          <div className="flex flex-col lg:flex-row lg:space-x-12 lg:space-y-0">
            <div className="w-[400px]">
              <TeamsList groups={data} />
            </div>
          </div>
        </div>
      </>
    );
  }
}
