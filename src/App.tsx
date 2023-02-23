import { FilterByAnyRemotely } from './components/filterByAny';
import { FilterBySelected } from './components/filterBySelected';
import { useComments } from './components/hooks';
import './styles.css';

export function App() {
  const { comments, loading, error } = useComments();

  return (
    <div className='main'>
      <div>
        <FilterByAnyRemotely comments={comments} loading={loading} error={error} />
      </div>
      <div>
        <FilterBySelected comments={comments} loading={loading} error={error} />
      </div>
    </div>
  );
}
