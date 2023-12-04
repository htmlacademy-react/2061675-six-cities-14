import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withStore } from './utils';
import App from './App.tsx';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "Main" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {} = withStore(withHistoryComponent, )
  });
});
