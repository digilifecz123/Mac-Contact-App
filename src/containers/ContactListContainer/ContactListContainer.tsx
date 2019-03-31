import React, { useCallback, useMemo } from 'react';
import { head, toPairs, apply, omit, map, compose, sortBy, prop } from 'ramda';

import { useStateValue, CONTACT_CHOSEN, IContact } from '../../store';
import { ContactList, ListItem, ContactListDivider, ListHeader } from '../../components';

const toIndividualKeys = compose<any, any[], ReadonlyArray<any>>(
    map(apply(omit)),
    toPairs
);

let prevHeader: string | null = null;

export const ContactListContainer = (props: any) => {
    const { state: { contactList }, dispatch } = useStateValue();

    const mapContactList = useMemo(() => compose(
        contactListArray => contactListArray.map((contact: IContact, index: number) => {
            const firstLastNameSymbol = head(contact.lastName);
            let header; 
            let divider;
            
            if (index === 0 || prevHeader !== firstLastNameSymbol) {
                header = <ListHeader key={firstLastNameSymbol}>{firstLastNameSymbol}</ListHeader>;
                prevHeader = firstLastNameSymbol;
                divider = <ContactListDivider key={`divider${firstLastNameSymbol}`}/>;
            }
    
            return (
                <>
                    {header}
                    {divider}
                    <ListItem key={contact.id} onClick={handleContactClick(contact.id)}>{`${contact.name} ${contact.lastName}`}</ListItem>
                </>
            );
        }),
        (contactListArray: ReadonlyArray<IContact>) => sortBy(prop('lastName'))(contactListArray),
        toIndividualKeys
    ), [contactList]);

    const handleContactClick = useCallback((contactId: string) => () => {
        dispatch({type: CONTACT_CHOSEN, payload: contactId});
    }, []);

    return (
        <ContactList>
                {mapContactList(contactList)}
        </ContactList>
    );
};

export default ContactListContainer;