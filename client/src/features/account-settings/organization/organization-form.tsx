import { useQuery } from "@tanstack/react-query";
import { Group, User } from "@/types";
import { useAuthContext } from "@/hooks/useAuthContext";
import { getGroups } from "@/utils/getGroups";

async function getData(user: User) {
  return getGroups(user);
}

export function OrgsForm() {
  const { user } = useAuthContext();

  const { isPending, data, error } = useQuery<Group[]>({
    queryKey: ["groups"],
    queryFn: () => getData(user),
  });

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {isPending ? (
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Teams You Are Apart Of
        </h2>
      ) : (
        <>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Teams You Are Apart Of
          </h2>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            {data.map((group) => (
              <li key={group.name}>{group.name}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
