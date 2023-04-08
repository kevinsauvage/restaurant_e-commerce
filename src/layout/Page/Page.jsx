import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';

import Banner from '../../components/Banner/Banner';
import CardItemBig from '../../components/CardItemBig/CarditemBig';
import Container from '../../components/Container/Container';
import Modal from '../../components/Modal/Modal';
import Navigation from '../../components/navigation/Navigation';
import { addSelectedItem } from '../../store/user/action';

import styles from './Page.module.scss';

const Page = ({ children, title, description, style }) => {
  const { selectedItem } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div style={style} className={styles.Page}>
      <Head>
        <title>{`UpToGo | ${title}`}</title>
        <meta
          name="description"
          content={`UpToGo | ${description || '| Ordering food made easy'}`}
        />
      </Head>
      <Banner />
      <Navigation />
      <Container>
        {selectedItem && (
          <Modal handleClose={() => dispatch(addSelectedItem())}>
            <CardItemBig item={selectedItem} />
          </Modal>
        )}
        {children}
      </Container>
    </div>
  );
};

export default Page;
