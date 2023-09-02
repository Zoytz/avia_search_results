import { FC, ReactElement } from 'react';

type PropsType = {
  children: ReactElement
}

const Sidebar: FC<PropsType> = ({children}) => {
  return (
    <div className='sidebar'>
      {children}
    </div>
  )
};

export default Sidebar;