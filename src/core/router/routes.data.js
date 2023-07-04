import { Home } from '@/components/screens/home/home.component';
import { NewTask } from '@/components/screens/new-task/new-task.component';

export const ROUTES = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/new',
		component: NewTask
	}
];
