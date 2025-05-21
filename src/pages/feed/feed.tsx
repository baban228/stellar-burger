import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { use_dispatch, useSelector } from '../../services/store';
import { feed_selectors, fetch_feed } from '../../services/slices/slice_feed';

/**
 * Компонент для отображения ленты заказов.
 * Включает логику загрузки данных и отображение интерфейса.
 */
export const Feed: FC = () => {
  // Получаем список заказов из состояния Redux с помощью селектора
  const orders: TOrder[] = useSelector(feed_selectors.orders_selector);

  const dispatch = use_dispatch();

  /**
   * useEffect для загрузки данных ленты заказов при монтировании компонента.
   * Вызывает асинхронное действие fetchFeed для получения данных.
   */
  useEffect(() => {
    dispatch(fetch_feed());
  }, [dispatch]);

  // Если заказы еще не загружены, отображаем прелоадер
  if (!orders.length) return <Preloader />;

  // Если заказы загружены, отображаем их в интерфейсе
  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetch_feed())} />
  );
};
