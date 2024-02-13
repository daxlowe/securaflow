import MenuBar from "@/components/menuBar/menuBar";
import { useAuthContext } from "@/hooks/useAuthContext";
import { User, Group } from "@/types";
import { getGroups } from "./utils/getGroups";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

async function getData(user: User): Promise<Group[]> {
  return await getGroups(user);
}

export default function Organization() {
  const { user } = useAuthContext();

  const { isPending, error, data } = useQuery<Group[]>({
    queryKey: ["groupData"],
    queryFn: () => getData(user),
  });

  const listItems = [];

  if (isPending) {
    return (
      <>
        <h1>Pending...</h1>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h1>{error.message}</h1>
      </>
    );
  }

  try {
    if ((data as any).error) {
      return (
        <>
          <div className="w-[100vw] h-[100vh] flex items-center justify-center">
            <Alert variant="destructive" className="w-[1/2]">
              <AlertDescription>{(data as any).error}</AlertDescription>
            </Alert>
          </div>
        </>
      );
    }

    if (data) {
      console.log(data);
      for (const group of data) {
        listItems.push(<li>{JSON.stringify(group)}</li>);
      }

      return (
        <>
          <div className="flex">
            <MenuBar />
            <div className="container mx-auto py-4">
              <h2 className="text-3xl font-bold tracking-tight pb-4">
                Organization
              </h2>
              <ul>{listItems}</ul>
            </div>
          </div>
        </>
      );
    }
  } catch (e) {
    let error = (e as Error).message;
    return (
      <>
        <div className="w-[100vw] h-[100vh] flex items-center justify-center">
          <Alert variant="destructive">
            <AlertTitle>{error}</AlertTitle>
            <AlertDescription>{JSON.stringify(data)}</AlertDescription>
          </Alert>
        </div>
      </>
    );
  }
}
