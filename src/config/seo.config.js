const SITE_NAME = 'TIME TASK';

export const getTitle = title => {
	return title ? `${title} | ${SITE_NAME}` : SITE_NAME;
};
