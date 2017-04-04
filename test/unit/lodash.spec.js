'use strict';

var chai = require('chai');
chai.use(require('sinon-chai'));
var expect = chai.expect;
var _ = require('lodash');
var datasets = require('../../app/datasets');
var sinon = require('sinon');

describe('Lodash training Util', function ()
{
    describe('attempt', function ()
    {
        var params;
        var attempt;
        before(function ()
        {
            params = datasets.attempt();
            attempt = _.attempt.apply(_, params);
        });
        it('should verify params', function ()
        {
            expect(params[0] instanceof Function).to.eql(true);
            expect(typeof params[1]).to.equal('number');
        });
        it('should not throw error with initial argument value', function ()
        {
            expect(_.isError(attempt)).to.eql(false);
        });
        it('should return passed initial argument value (second argument)', function ()
        {
            expect(attempt).to.eql(3);
        });
        it('should not throw error when argument is not negative number', function ()
        {
            expect(_.isError(_.attempt(params[0], 6))).to.eql(false);
            expect(_.isError(_.attempt(params[0], 98))).to.eql(false);
        });
        it('should return passed argument value when is not negative', function ()
        {
            expect(_.attempt(params[0], 6)).to.equal(6);
            expect(_.attempt(params[0], 98)).to.equal(98);
        });
    });

    describe('conforms', function ()
    {
        var params;
        var elem1;
        var conforms;
        before(function ()
        {
            params = datasets.conforms();
            elem1 = params[0];
            conforms = _.conforms.apply(_, params);
        });
        it('should verify params', function ()
        {
            expect(params[0] instanceof Object).to.eql(true);
        });
        it('should return false accordind corresponding property values of a given object ', function ()
        {
            expect(conforms({temperature: 3, pressure: 2000})).to.eql(false);
        });
    });

    describe('constant', function ()
    {
        var params;
        var elem1;
        var constant;
        before(function ()
        {
            params = datasets.constant();
            elem1 = params[0];
            constant = _.constant.apply(_, params);
        });
        it('should verify params', function ()
        {
            expect(params[0] instanceof Object).to.eql(true);
        });
        it('should create a function that returns value', function ()
        {
            expect(constant()).to.eql({John: 20, 'active': true});
        });
    });

    describe('flow', function ()
    {
        var params;
        var elem1;
        var elem2;
        var flow;
        before(function ()
        {
            params = datasets.flow();
            elem1 = params[0];
            elem2 = params[1];
            flow = _.flow.apply(_, params);
        });
        it('should verify params', function ()
        {
            expect(elem1 instanceof Function).to.eql(true);
            expect(elem2 instanceof Function).to.eql(true);
        });
        it('should add first element to second element and then square result ', function ()
        {
            expect(flow(1, 2)).to.eql(9);
            expect(flow(2, 3)).to.eql(25);
            expect(flow(3, 4)).to.eql(49);
            expect(flow(4, 5)).to.eql(81);
        });
    });

    describe('flowRight', function ()
    {
        var params;
        var elem1;
        var elem2;
        var flowRight;
        before(function ()
        {
            params = datasets.flowRight();
            elem1 = params[0];
            elem2 = params[1];
            flowRight = _.flowRight.apply(_, params);
        });


        it('should verify params', function ()
        {
            expect(elem1 instanceof Function).to.eql(true);
            expect(elem2 instanceof Function).to.eql(true);
        });
        it('should multiply first element by second element and then result should be doubled', function ()
        {
            expect(flowRight(2, 2)).to.eql(8);
            expect(flowRight(10, 2)).to.eql(40);
            expect(flowRight(5, 3)).to.eql(30);
            expect(flowRight(6, 4)).to.eql(48);
        });
    });

    describe('identity', function ()
    {
        var params;
        var elem1;
        var identity;
        before(function ()
        {
            params = datasets.identity();
            elem1 = params[0];
            identity = _.identity.apply(_, params);
        });
        it('should verify params', function ()
        {
            expect(elem1 instanceof Object).to.eql(true);
        });
        it('should return first property', function ()
        {
            expect(identity).to.have.property('elem1', 35);
        });
        it('should return second property', function ()
        {
            expect(identity).to.have.property('elem2', true);
        });
    });

    describe('matches', function ()
    {
        var params;
        var elem1;
        var matches;
        before(function ()
        {
            params = datasets.matches();
            elem1 = params[0];
            matches = _.matches.apply(_, params);
        });
        it('should verify params', function ()
        {
            expect(params.length).to.equal(1);
            expect(elem1 instanceof Object).to.eql(true);
        });
        it('should check object keys', function ()
        {
            expect(params[0]).to.have.all.keys('number', 'pass');
        });
        it('should return matches property', function ()
        {
            expect(matches({'day': 'Monday', 'number': 1, 'pass': true})).to.equal(true);
            expect(matches({'day': 'Tuesday', 'number': 2, 'pass': false})).to.equal(false);
        });
    });

    describe('matchesProperty', function ()
    {
        var params;
        var elem1;
        var elem2;
        var matchesProperty;
        before(function ()
        {
            params = datasets.matchesProperty();
            elem1 = params[0];
            elem2 = params[1];
            matchesProperty = _.matchesProperty.apply(_, params);
        });


        it('should verify params', function ()
        {
            expect(params.length).to.equal(2);
            expect(typeof params[0]).to.eql('string');
            expect(typeof params[1]).to.eql('string');
        });
        it('should return true or false if property are matches', function ()
        {
            expect(matchesProperty({'type': 'banana'})).to.equal(true);
            expect(matchesProperty({'type': 'avocado'})).to.equal(false);
        });
    });

    describe('method', function ()
    {
        var params;
        var obj;
        var elem1;
        var method;
        beforeEach(function ()
        {
            params = datasets.method();
            elem1 = params[0];
            obj = {
                a: {
                    b: sinon.spy(method)
                }
            };
            method = _.method.apply(_, params);
            method(obj);
        });
        it('should verify params', function ()
        {
            expect(params).to.have.length(1);
            expect(typeof elem1).to.eql('string');
        });
        it('should returns the new invoker function', function ()
        {
            expect(obj.a.b).to.have.been.callCount(1);
        });
    });

    describe('methodOf', function ()
    {
        var params;
        var obj;
        var methodOf;
        var path;
        before(function ()
        {
            params = datasets.methodOf();
            obj = params[0];
            path = 'a.b';
            methodOf = _.methodOf.apply(_, params);
        });
        it('should verify params', function ()
        {
            expect(params).to.have.length(1);
            expect(obj instanceof Object).to.eql(true);
        });
        it('should returns the new invoker function', function ()
        {
            expect(methodOf(path)).to.eql(5);
        });
    });

    describe('noop', function ()
    {
        var params;
        var elem1;
        before(function ()
        {
            params = datasets.noop();
            elem1 = params[0];
        });
        it('should verify params', function ()
        {
            expect(elem1 instanceof Object).to.eql(true);
        });
        it('should check object properties', function ()
        {
            expect(elem1).to.have.property('number', 5);
            expect(elem1).to.have.property('square', 25);
        });
        it('should return undefined', function ()
        {
            expect(_.noop.apply(_, params)).to.eql(undefined);
        });
    });

    describe('nthArg', function ()
    {
        describe('nthArg1', function ()
        {
            var params;
            var elem1;
            var nthArg;
            before(function ()
            {
                params = datasets.nthArg1();
                elem1 = params[0];
                nthArg = _.nthArg.apply(_, params);
            });
            it('should verify params', function ()
            {
                expect(typeof elem1).to.eql('number');
            });
            it('should return third argument from each expect', function ()
            {
                expect(nthArg('a', 'b', 'c', 'd')).to.eql('c');
                expect(nthArg('ab', 'ba', 'c')).to.eql('c');
                expect(nthArg('d', '3', 'c')).to.eql('c');
            });
        });
        describe('nthArg2', function ()
        {
            var params,
                elem1,
                nthArg;
            before(function ()
            {
                params = datasets.nthArg2();
                elem1 = params[0];
                nthArg = _.nthArg.apply(_, params);
            });
            it('should verify params', function ()
            {
                expect(typeof elem1).to.eql('number');
            });
            it('should return last argument from each expect', function ()
            {
                expect(nthArg('num1', 'num2', 'num3', 'num4', 'num5')).to.eql('num5');
                expect(nthArg('num3', 'num4', 'num5')).to.eql('num5');
                expect(nthArg('a', 'b', 'c')).to.eql('c');
            });
        });
    });

    describe('over', function ()
    {
        describe('over1', function ()
        {
            var params;
            var elem1;
            var over;
            before(function ()
            {
                params = datasets.over1();
                elem1 = params[0];
                over = _.over.apply(_, params);
            });
            it('should verify params', function ()
            {
                expect(elem1 instanceof Array).to.eql(true);
                expect(elem1[0] instanceof Function).to.eql(true);
                expect(elem1[1] instanceof Function).to.eql(true);
            });
            it('should return array with floored number and with sqrt of this number', function ()
            {
                expect(over(9.9)).to.eql([9, 3.146426544510455]);
                expect(over(4.72)).to.eql([4, 2.172556098240043]);
            });
        });
        describe('over2', function ()
        {
            var params;
            var elem1;
            var over;
            before(function ()
            {
                params = datasets.over2();
                elem1 = params[0];
                over = _.over.apply(_, params);
            });
            it('should verify params', function ()
            {
                expect(elem1 instanceof Function).to.eql(true);
            });
            it('should return array with abs value', function ()
            {
                expect(over(-10)).to.eql([10]);
                expect(over(34)).to.eql([34]);
            });
        });

        describe('over3', function ()
        {
            var params;
            var elem1;
            var over;
            before(function ()
            {
                params = datasets.over3();
                elem1 = params[0];
                over = _.over.apply(_, params);
            });
            it('should verify params', function ()
            {
                expect(elem1 instanceof Array).to.eql(true);
                expect(elem1[0] instanceof Function).to.eql(true);
                expect(elem1[1] instanceof Function).to.eql(true);
            });
            it('should return array with max and min values from given numbers', function ()
            {
                expect(over(3, 4, 2, 8, 7)).to.eql([8, 2]);
                expect(over(-3, 0, 2, 88, 32, 12)).to.eql([88, -3]);
            });
        });
    });

    describe('overEvery', function ()
    {
        describe('overEvery1', function ()
        {
            var params;
            var elem1;
            var overEvery;
            before(function ()
            {
                params = datasets.overEvery1();
                elem1 = params[0];
                overEvery = _.overEvery.apply(_, params);
            });
            it('should verify params', function ()
            {
                expect(elem1 instanceof Array).to.eql(true);
                expect(elem1[0] instanceof Function).to.eql(true);
                expect(elem1[1] instanceof Function).to.eql(true);
            });
            it('should return boolean from given class or functions', function ()
            {
                expect(overEvery(5)).to.eql(true);
                expect(overEvery(NaN)).to.eql(false);
            });
        });


        describe('overEvery2', function ()
        {
            var params;
            var elem1;
            var overEvery;
            before(function ()
            {
                params = datasets.overEvery2();
                elem1 = params[0];
                overEvery = _.overEvery.apply(_, params);
            });
            it('should verify params', function ()
            {
                expect(elem1 instanceof Function).to.eql(true);
            });
            it('should return boolean from given class', function ()
            {
                expect(overEvery('lodash')).to.eql(true);
                expect(overEvery(undefined)).to.eql(false);
            });
        });
    });

    describe('overSome', function ()
    {
        describe('overSome1', function ()
        {
            var params;
            var overSome;
            var elem1;
            before(function ()
            {
                params = datasets.overSome1();
                overSome = _.overSome.apply(_, params);
                elem1 = params[0];
            });
            it('should check type array\'s functions', function ()
            {
                expect(elem1 instanceof Array).to.eql(true);
                expect(elem1[0] instanceof Function).to.eql(true);
                expect(elem1[1] instanceof Function).to.eql(true);
            });
            it('should return true if value is divisible by 3', function ()
            {
                expect(overSome(3)).to.eql(true);
                expect(overSome(21)).to.eql(true);
            });
            it('should return true if value is divisible by 10', function ()
            {
                expect(overSome(10)).to.eql(true);
                expect(overSome(20)).to.eql(true);
            });
            it('should return true if value is divisible by 3 and 10', function ()
            {
                expect(overSome(4)).to.eql(false);
                expect(overSome(22)).to.eql(false);
            });
        });

        describe('overSome2', function ()
        {
            var params;
            var elem1;
            var overSome;
            before(function ()
            {
                params = datasets.overSome2();
                elem1 = params[0];
                overSome = _.overSome.apply(_, params);
            });
            it('should check type array\'s functions', function ()
            {
                expect(elem1 instanceof Array).to.eql(true);
                expect(elem1[0] instanceof Function).to.eql(true);
            });
            it('should return true if value is number', function ()
            {
                expect(overSome(7)).to.eql(true);
                expect(overSome(4)).to.eql(true);
                expect(overSome('lodash-util')).to.eql(true);
            });
            it('should return false if value is not finite', function ()
            {
                expect(overSome(NaN)).to.eql(false);
                expect(overSome(undefined)).to.eql(false);
                expect(overSome(Number.MAX_INTEGER)).to.eql(false);
            });
        });
    });

    describe('property', function ()
    {
        describe('property1', function ()
        {
            var params;
            var elem1;
            var property;
            var result;
            before(function ()
            {
                params = datasets.property1();
                elem1 = params[0];
                property = _.property.apply(_, params);
            });
            it('should check type of given argument', function ()
            {
                expect(typeof elem1).to.eql('string');
            });
            it('should return array of values from object', function ()
            {
                var obj = [
                    {a: {b: 5}},
                    {a: {b: 7}},
                    {a: {b: 54}}
                ];
                result = _.map(obj, property);
                expect(result).to.eql([5, 7, 54]);
            });
        });

        describe('property2', function ()
        {
            var params;
            var elem1;
            var property;
            var result;
            before(function ()
            {
                params = datasets.property2();
                elem1 = params[0];
                property = _.property.apply(_, params);
            });
            it('should verify params', function ()
            {
                expect(elem1 instanceof Object).to.eql(true);
            });
            it('should return sorted array of values', function ()
            {
                var obj = [
                    {'c': {'d': 98}},
                    {'c': {'d': 2}},
                    {'c': {'d': 56}}
                ];
                result = _.map(_.sortBy(obj, property), 'c.d');
                expect(result).to.eql([2, 56, 98]);
            });
        });
    });

    describe('propertyOf', function ()
    {
        describe('propertyOf1', function ()
        {
            var params;
            var elem1;
            var propertyOf;
            var result;
            var obj;
            before(function ()
            {
                params = datasets.propertyOf1();
                elem1 = params[0];
                propertyOf = _.propertyOf.apply(_, params);
                obj = params[0];
            });
            it('should verify params', function ()
            {
                expect(elem1 instanceof Object).to.eql(true);
            });
            it('should check value of properties in obj', function ()
            {

                expect(obj).to.have.property('number1');
                expect(obj).to.have.property('number2');
                expect(obj).to.have.property('number3');
            });
            it('should check value each element in object', function ()
            {
                expect(obj.number1 instanceof Array).to.eql(true);
                expect(obj.number1).to.have.length(6);
                expect(obj.number2 instanceof Array).to.eql(true);
                expect(obj.number2).to.have.length(6);
                expect(obj.number3 instanceof Array).to.eql(true);
                expect(obj.number3).to.have.length(6);
            });
            it('should return array', function ()
            {
                result = _.map(['number1[2]', 'number2[3]', 'number3[4]'], propertyOf);
                expect(result).to.eql([15, 30, 37]);
            });
        });

        describe('propertyOf2', function ()
        {
            var params;
            var elem1;
            var propertyOf;
            var result;
            before(function ()
            {
                params = datasets.propertyOf2();
                elem1 = params[0];
                propertyOf = _.propertyOf.apply(_, params);
            });
            it('should verify params', function ()
            {
                expect(elem1 instanceof Object).to.eql(true);
            });
            it('should value of properties in obj', function ()
            {
                var obj = params[0];
                expect(obj.number1 instanceof Array).to.eql(true);
                expect(obj.number1).to.have.length(6);
                expect(obj.number2 instanceof Array).to.eql(true);
                expect(obj.number2).to.have.length(6);
                expect(obj.number3 instanceof Array).to.eql(true);
                expect(obj.number3).to.have.length(6);
            });
            it('should return array', function ()
            {
                result = _.map([['number1', '2'], ['number2', '3'], ['number3', '4']], propertyOf);
                expect(result).to.eql([15, 30, 37]);
            });
        });
    });

    describe('range', function ()
    {
        describe('range1', function ()
        {
            var params;
            var elem1;
            before(function ()
            {
                params = datasets.range1();
                elem1 = params[0];
            });
            it('should verify params', function ()
            {
                expect(typeof elem1).to.eql('number');
                expect(elem1 instanceof Array).to.eql(false);
                expect(params).to.have.length(1);
            });
            it('should pass only one argument to achieve right return values', function ()
            {
                expect(params).to.have.length(1);
            });
            it('should return array with integer values from 0 to 5', function ()
            {
                expect(_.range.apply(_, params)).to.eql([0, 1, 2, 3, 4, 5]);
            });
        });

        describe('range2', function ()
        {
            var params;
            var elem1;
            var elem2;
            before(function ()
            {
                params = datasets.range2();
                elem1 = params[0];
                elem2 = params[1];
            });
            it('should verify params', function ()
            {
                expect(elem1 instanceof Array).to.eql(false);
                expect(typeof elem1).to.eql('number');
                expect(typeof elem2).to.eql('number');
                expect(params).to.have.length(2);
            });
            it('should pass only two argument to achieve right return values', function ()
            {
                expect(params).to.have.length(2);
            });
            it('should return array with integer values from 5 to 8', function ()
            {
                expect(_.range.apply(_, params)).to.eql([5, 6, 7, 8]);
            });
        });

        describe('range3', function ()
        {
            var params;
            var elem1;
            var elem2;
            var elem3;
            before(function ()
            {
                params = datasets.range3();
                elem1 = params[0];
                elem2 = params[1];
                elem3 = params[2];
            });
            it('should verify params', function ()
            {
                expect(elem1 instanceof Array).to.eql(false);
                expect(typeof elem1).to.eql('number');
                expect(typeof elem2).to.eql('number');
                expect(typeof elem3).to.eql('number');
                expect(params).to.have.length(3);
            });
            it('should pass only three argument to achieve right return values', function ()
            {
                expect(params).to.have.length(3);
            });
            it('should return array with signed integer values from -10 to -14', function ()
            {
                expect(_.range.apply(_, params)).to.eql([-10, -11, -12, -13, -14]);
            });
        });
    });

    describe('rangeRight', function ()
    {
        describe('rangeRight1', function ()
        {
            var params;
            var elem1;
            before(function ()
            {
                params = datasets.rangeRight1();
                elem1 = params[0];
            });
            it('should verify params', function ()
            {
                expect(typeof elem1).to.eql('number');
                expect(elem1 instanceof Array).to.eql(false);
                expect(params).to.have.length(1);
                expect(elem1).to.equal(5);
            });
            it('should return array of rangeRight values', function ()
            {
                expect(_.rangeRight.apply(_, params)).to.eql([4, 3, 2, 1, 0]);
            });
        });

        describe('rangeRight2', function ()
        {
            var params;
            var elem1;
            var elem2;
            before(function ()
            {
                params = datasets.rangeRight2();
                elem1 = params[0];
                elem2 = params[1];
            });
            it('should verify params', function ()
            {
                expect(elem1 instanceof Array).to.eql(false);
                expect(typeof elem1).to.eql('number');
                expect(typeof elem2).to.eql('number');
                expect(params).to.have.length(2);
            });
            it('should return array of rangeRight values', function ()
            {
                expect(_.rangeRight.apply(_, params)).to.eql([9, 8, 7, 6, 5, 4, 3]);
            });
        });

        describe('rangeRight3', function ()
        {
            var params;
            var elem1;
            var elem2;
            var elem3;
            before(function ()
            {
                params = datasets.rangeRight3();
                elem1 = params[0];
                elem2 = params[1];
                elem3 = params[2];
            });
            it('should verify params', function ()
            {
                expect(elem1 instanceof Array).to.eql(false);
                expect(typeof elem1).to.eql('number');
                expect(typeof elem2).to.eql('number');
                expect(typeof elem3).to.eql('number');
                expect(params).to.have.length(3);
            });
            it('should return array of rangeRight values', function ()
            {
                expect(_.rangeRight.apply(_, params)).to.eql([10, 8, 6, 4, 2]);
            });
        });
    });

    describe('times', function ()
    {
        var params;
        var elem1;
        var elem2;
        before(function ()
        {
            params = datasets.times();
            elem1 = params[0];
            elem2 = params[1];
        });
        it('should verify params', function ()
        {
            expect(params).to.have.length(2);
            expect(typeof elem1).to.eql('number');
            expect(elem1 instanceof Array).to.eql(false);
            expect(elem2 instanceof Function).to.eql(true);
        });
        it('should return array with square values', function ()
        {
            expect(_.times.apply(_, params)).to.eql([0, 1, 4, 9, 16]);
        });
    });

    describe('toPath', function ()
    {
        var params;
        var elem1;
        before(function ()
        {
            params = datasets.toPath();
            elem1 = params[0];
        });
        it('should verify param', function ()
        {
            expect(typeof elem1).to.eql('string');
            expect(elem1).to.have.length(8);
        });
        it('should return array with given values', function ()
        {
            var toPathResults = _.toPath.apply(_, params);
            expect(toPathResults).to.eql(['a', 'b', 'c', '4']);
        });
    });

});
