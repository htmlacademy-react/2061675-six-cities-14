import { Main } from './pages/main';
import { PlacesCount } from './const/placesCount.ts';

export default function App() {
  return (
    <Main placesCount={PlacesCount.count}/>
  );
}
