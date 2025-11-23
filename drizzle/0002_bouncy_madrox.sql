CREATE TABLE `guide_feedback` (
	`id` int AUTO_INCREMENT NOT NULL,
	`guidePage` varchar(100) NOT NULL,
	`isHelpful` boolean NOT NULL,
	`userId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `guide_feedback_id` PRIMARY KEY(`id`)
);
