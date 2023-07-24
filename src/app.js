import { stylesheet } from './css/style.module.css';
import { isPastePage, onPastePage } from './pages/paste';
document.head.append(VM.m(<style>{stylesheet}</style>));

const moreButtons = true;
const alternativeTheme = true;

if (isPastePage(location.href)) {
  console.log('Loading paste page.');
  onPastePage(moreButtons, alternativeTheme);
}
