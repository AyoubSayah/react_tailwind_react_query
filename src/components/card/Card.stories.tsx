import type { Meta, StoryObj } from '@storybook/react'
import Card from './Card';

const meta: Meta<typeof Card> = {
    title: 'Components/Card',
    component: Card,
    tags: ['autodocs'],
    args: {
        children: 'This is a card content',
    },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {}

export const WithHeader: Story = {
    args: {
        header: 'Card Header',
        children: 'Card with a header',
    },
}

export const WithFooter: Story = {
    args: {
        footer: 'Card Footer',
        children: 'Card with a footer',
    },
}

export const WithHeaderAndFooter: Story = {
    args: {
        header: 'Card Header',
        footer: 'Card Footer',
        children: 'Card with both header and footer',
    },
}

export const NoShadow: Story = {
    args: {
        children: 'No shadow, border only',
        shadow: false,
    },
}

export const NoBorder: Story = {
    args: {
        children: 'No border, shadow only',
        border: false,
    },
}

export const CustomPadding: Story = {
    args: {
        children: 'Custom padding (p-2)',
        padding: 'p-2',
    },
}