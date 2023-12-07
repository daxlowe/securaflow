import React from 'react';
import { ViewTicket } from "@/components/ViewTicketPopup";
import { ModifyTicket } from "@/components/ModifyTicketPopup";
import { CreateTicket } from "@/components/CreateTicketPopup";
import { Task } from "../types";

enum ComponentTypes {
  ViewTicket = 'viewTicket',
  ModifyTicket = 'modifyTicket',
  CreateTicket = 'createTicket'
}

interface TicketActionViewProps {
  activeComponent: ComponentTypes | null;
  task: Task;
}

const TicketActionView: React.FC<TicketActionViewProps> = ({ activeComponent, task }) => {
  const components: Record<ComponentTypes, JSX.Element | null> = {
    [ComponentTypes.ViewTicket]: <ViewTicket task={task} />,
    [ComponentTypes.ModifyTicket]: <ModifyTicket task={task} />,
    [ComponentTypes.CreateTicket]: <CreateTicket />,
  };

  return <>{activeComponent ? components[activeComponent] : null}</>;
};

export default TicketActionView;
export { ComponentTypes };