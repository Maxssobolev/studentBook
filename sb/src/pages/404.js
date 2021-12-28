import React from 'react';
import { TEXT } from '../config/text/text';

export default function NotFoundPage() {
    return (
        <div className="page page-404">
            {TEXT.page.notFound.title}
        </div>
    )
}