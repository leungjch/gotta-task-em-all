import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    titleText: {
        textAlign: 'center',
        fontSize: 20,
    },
    paragraph: {
        fontSize: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        marginBottom: 10,
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 0,
        marginTop: 0,
        textAlign: 'center',
    },
    modalContent: {
        padding: 20,
        flex: 1,
        backgroundColor: '#3f72af',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    modalToggle: {
        alignSelf: 'center',
        position: 'absolute',
        top: 50,
    },
    item: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 6,
        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        flexDirection: 'row',
    },
    itemText: {
        marginLeft: 10,
    },
    itemRemove: {
        marginLeft: 'auto'
    }
})