import LayoutComponent from '../Components/layoutComponents.jsx/LayoutComponent';
import { SideBarComponent } from '../Components/layoutComponents.jsx/SideBarComponent';

const ScholarshipApplicationPage = () => {
  return <div className='flex'>
    <SideBarComponent/>
    <LayoutComponent/>
  </div>
};

export default ScholarshipApplicationPage;