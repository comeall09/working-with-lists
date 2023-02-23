import { FilterBySelected } from 'src/components/filterBySelected';
import { FilterByAny } from 'src/components/filterByAny';
import { useComments } from 'src/components/hooks';
import './styles.css';

export function App() {
  const { comments, loading, error } = useComments();

  return (
    <div className='main'>
      <FilterByAny comments={comments} loading={loading} error={error} />
      <FilterBySelected comments={comments} loading={loading} error={error} />
    </div>
  );
}
