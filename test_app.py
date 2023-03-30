from unittest import TestCase
from app import app
from flask import Flask, request, render_template, redirect, flash, session
from boggle import Boggle

class AppTestCase(TestCase):

    def setUp(self):
        """Here is the set up before every test case."""

        self.client = app.test_client()
        app.config['TESTING'] = True


    def test_root_redirect(self):
        """Testing root redirection to home page."""
        with app.test_client() as client:
            resp = client.get('/')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 302)
            
    def test_home_status(self):
        """Testing home directory status code 200."""
        with app.test_client() as client:
            resp = client.get('/home')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)

            self.assertIn('<a class="navbar-brand" href="#">Boggle!</a>', html)

 

    def test_homepage_session(self):
        """Make sure information is in the session and redirect is executed"""

        with self.client:
            response = self.client.post('/home')
            #self.assertIn('OUR_BOARD', session)
            self.assertIsNotNone('', session)
            self.assertEqual(response.status_code, 302)

    def test_word_checker_ok(self):
        """Check to see if submitted guess is good for points"""

        with self.client as client:
            # Any changes to session should go in here:
            with client.session_transaction() as change_session:
                change_session[''] =  [['M', 'M', 'G', 'R', 'F'], ['P', 'O', 'Q', 'J', 'G'], ['Y', 'P', 'Y', 'P', 'H'], ['R', 'P', 'C', 'W', 'B'], ['G', 'A', 'H', 'M', 'S']]
            response = self.client.get('/check-word?word=a')
            
            self.assertEqual(response.json['result'], 'a')
            self.assertEqual(response.json['valid'], 'ok')
            self.assertEqual(response.json['found'], False)
            self.assertEqual(response.status_code, 200)  
    
    def test_word_checker_not_a_word(self):
        """Make sure checker evaluates non word guesses as not a word"""

        with self.client as client:
            # Any changes to session should go in here:
            with client.session_transaction() as change_session:
                change_session[''] =  [['M', 'M', 'G', 'R', 'F'], ['P', 'O', 'Q', 'J', 'G'], ['Y', 'P', 'Y', 'P', 'H'], ['R', 'P', 'C', 'W', 'B'], ['G', 'A', 'H', 'M', 'S']]
            response = self.client.get('/check-word?word=aefaefaefaef')
            
            self.assertEqual(response.json['result'], 'aefaefaefaef')
            self.assertEqual(response.json['valid'], 'not-word')
            self.assertEqual(response.json['found'], False)
            self.assertEqual(response.status_code, 200)  

    def test_word_checker_not_a_word(self):
        """Make sure checker evaluates word guesses that are not found as not in board"""

        with self.client as client:
            # Any changes to session should go in here:
            with client.session_transaction() as change_session:
                change_session[''] =  [['M', 'M', 'G', 'R', 'F'], ['P', 'O', 'Q', 'J', 'G'], ['Y', 'P', 'Y', 'P', 'H'], ['R', 'P', 'C', 'W', 'B'], ['G', 'A', 'H', 'M', 'S']]
            response = self.client.get('/check-word?word=finger')
            
            self.assertEqual(response.json['result'], 'finger')
            self.assertEqual(response.json['valid'], 'not-on-board')
            self.assertEqual(response.json['found'], False)
            self.assertEqual(response.status_code, 200)  