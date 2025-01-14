// SpacesRoutes.jsx
import { SpacesProvider } from '../contexts/SpacesContext';
import Spaces from '../pages/Spaces';
import SpaceDetails from '../pages/SpaceDetails';
import Comments from '../pages/Comments';
import { Route } from 'react-router-dom';

export default function SpacesRoutes() {
  return (
    <SpacesProvider>
        
      <Route path="/spaces" element={<Spaces />} />
      <Route path="/spaces/:id" element={<SpaceDetails />} />
      <Route path="/comments" element={<Comments />} />
    </SpacesProvider>
  );
}
