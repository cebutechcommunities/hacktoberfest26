export type Project = {
  id: string;
  title: string;
  team: string;
  text: string;
  needs: string;
  level: string;
  open: boolean;
};
export const sampleProjects: Project[] = [
  { id: 'sakay', title: 'A clearer commute', team: 'Team Sakay', text: 'Help people understand Cebu jeepney routes. An existing project ready for better maps and clearer directions.', needs: 'Design · Local research · Web development', level: 'Existing project', open: true },
  { id: 'pulong', title: 'Cebuano learning companion', team: 'Pulong', text: 'Explore an open-weight model as a practice partner for everyday Cebuano conversations.', needs: 'Language feedback · Model exploration · Testing', level: 'New idea', open: true },
  { id: 'map', title: 'Community resource map', team: 'Open Neighbourhood', text: 'Make useful community spaces and resources easier to find, together.', needs: 'Writing · Research · Development', level: 'New idea', open: true },
];
export type Participation = {
  projects: Project[];
  requests: { projectId: string; status: 'pending' | 'member' }[];
  nextId: number;
};
export const emptyParticipation: Participation = { projects: [], requests: [], nextId: 1 };
export type ParticipationAction =
  | { type: 'create'; project: Omit<Project, 'id'> }
  | { type: 'request' | 'approve' | 'cancel'; projectId: string }
  | { type: 'reset' };

export function participationReducer(state: Participation, action: ParticipationAction): Participation {
  switch (action.type) {
    case 'reset': return emptyParticipation;
    case 'create':
      return { ...state, nextId: state.nextId + 1, projects: [...state.projects, { ...action.project, id: `own-${state.nextId}` }] };
    case 'request':
      // A request adds an interest. It never replaces another contribution or grants membership.
      if (!sampleProjects.some(project => project.id === action.projectId && project.open) ||
          state.requests.some(request => request.projectId === action.projectId)) return state;
      return { ...state, requests: [...state.requests, { projectId: action.projectId, status: 'pending' }] };
    case 'approve':
      return { ...state, requests: state.requests.map(request => request.projectId === action.projectId && request.status === 'pending' ? { ...request, status: 'member' } : request) };
    case 'cancel':
      return { ...state, requests: state.requests.filter(request => !(request.projectId === action.projectId && request.status === 'pending')) };
  }
}
