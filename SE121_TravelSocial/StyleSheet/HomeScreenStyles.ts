import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    logo:{
        marginTop: 20,
        width:50,
        height:50,
        marginLeft: 10,
    },

    search: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 24,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#F3F8FE',
        width: '90%',
      },
    icon: {
        width: 20, 
        height: 20, 
        marginRight: 10,
        color:'black',
      },
    input: {
        flex: 1,
        height: 40,
        color: '#000000',
      },
    header: {
        borderWidth: 1,
        height: 250,
    },
    text_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text1: {
        fontSize: 18,
        marginLeft: '12%',
    },
    text2: {
        fontSize: 36,
        marginLeft: '12%',
        fontWeight: '500',
    },
    text3: {
        fontSize: 14,
        marginRight: '10%',
    },
    textInputContainer: {
        marginTop: 20,
        marginHorizontal: '5%',
        borderRadius: 24,
        backgroundColor: '#A8CCF0',
        opacity: 0.2,
        height: '25%',
        padding: 20,
    },
    textInput: {
        fontSize: 14,
    },
    categoryContainer: {},
    flatList: {
        marginTop: 10,
    },
    body: {
        flex: 1,
        marginBottom: '0%',
    },
    popularList: {},
});